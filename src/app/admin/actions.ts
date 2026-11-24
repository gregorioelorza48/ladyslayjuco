"use server";

import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { makeSlug } from "@/lib/post-shared";
import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 5 * 1024 * 1024;

export type ActionState = {
  error?: string;
  ok?: boolean;
};

function extForMime(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

async function uploadImageIfPresent(
  supabase: SupabaseClient,
  formData: FormData,
): Promise<string | null> {
  const file = formData.get("image");
  if (!file || !(file instanceof File) || file.size === 0) {
    return null;
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Only JPEG, PNG, and WebP images are allowed");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Image must be 5 MB or smaller");
  }

  const filename = `${crypto.randomUUID()}.${extForMime(file.type)}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("post-images")
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.from("post-images").getPublicUrl(filename);
  return data.publicUrl;
}

function parseFields(formData: FormData) {
  const body = String(formData.get("body") ?? "").trim();
  const headlineRaw = String(formData.get("headline") ?? "").trim();
  const sportRaw = String(formData.get("sport") ?? "").trim();
  const removeImage = formData.get("remove_image") === "on";

  if (!body) {
    throw new Error("Body is required");
  }

  return {
    body,
    headline: headlineRaw || null,
    sport: sportRaw || null,
    removeImage,
  };
}

async function getRequestOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;

  const { headers } = await import("next/headers");
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host");
  const proto = h.get("x-forwarded-proto") || "https";
  if (host) return `${proto}://${host}`;
  return "http://localhost:3000";
}

export async function requestMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .toLowerCase()
    .trim();
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();

  if (!adminEmail || email !== adminEmail) {
    redirect("/admin/login?error=forbidden");
  }

  const supabase = await createClient();
  const origin = await getRequestOrigin();

  // Sends an email with a one-time code (and usually a link).
  // Prefer entering the code on this page — avoids PKCE browser mismatch.
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/admin`,
      shouldCreateUser: true,
    },
  });

  if (error) {
    console.error("signInWithOtp failed", error.message, error);
    redirect(
      `/admin/login?error=send&detail=${encodeURIComponent(error.message)}`,
    );
  }

  redirect(`/admin/login?sent=1&email=${encodeURIComponent(email)}`);
}

export async function verifyEmailCode(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .toLowerCase()
    .trim();
  const token = String(formData.get("token") ?? "")
    .trim()
    .replace(/\s+/g, "");
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();

  if (!adminEmail || email !== adminEmail) {
    redirect("/admin/login?error=forbidden");
  }
  if (!token) {
    redirect(
      `/admin/login?sent=1&email=${encodeURIComponent(email)}&error=auth&detail=${encodeURIComponent("Enter the code from your email.")}`,
    );
  }

  const supabase = await createClient();

  let error =
    (
      await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      })
    ).error ?? null;

  if (error) {
    error =
      (
        await supabase.auth.verifyOtp({
          email,
          token,
          type: "magiclink",
        })
      ).error ?? error;
  }

  if (error) {
    redirect(
      `/admin/login?sent=1&email=${encodeURIComponent(email)}&error=auth&detail=${encodeURIComponent(error.message)}`,
    );
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

async function savePost(
  formData: FormData,
  status: "draft" | "published",
): Promise<ActionState> {
  try {
    const { supabase } = await requireAdmin();
    const id = String(formData.get("id") ?? "");
    const { body, headline, sport, removeImage } = parseFields(formData);

    let image_url: string | null = null;
    let slug = makeSlug(headline, body);

    if (id) {
      const { data: existing, error: fetchError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError || !existing) {
        return { error: "Post not found" };
      }

      slug = existing.slug;
      image_url = existing.image_url;
      if (removeImage) {
        image_url = null;
      } else {
        const uploaded = await uploadImageIfPresent(supabase, formData);
        if (uploaded) image_url = uploaded;
      }

      const published_at =
        status === "published"
          ? existing.published_at ?? new Date().toISOString()
          : null;

      const { error } = await supabase
        .from("posts")
        .update({
          headline,
          body,
          sport,
          image_url,
          status,
          published_at,
        })
        .eq("id", id);

      if (error) {
        return { error: error.message };
      }

      revalidatePath("/");
      revalidatePath("/admin");
      revalidatePath(`/blog/${slug}`);
      revalidatePath(`/admin/edit/${id}`);

      if (status === "published") {
        redirect("/");
      }
      redirect(`/admin/edit/${id}`);
    }

    if (!removeImage) {
      image_url = await uploadImageIfPresent(supabase, formData);
    }

    const published_at =
      status === "published" ? new Date().toISOString() : null;

    const { data, error } = await supabase
      .from("posts")
      .insert({
        slug,
        headline,
        body,
        sport,
        image_url,
        status,
        published_at,
      })
      .select("id")
      .single();

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/admin");
    if (status === "published") {
      revalidatePath(`/blog/${slug}`);
      redirect("/");
    }
    redirect(`/admin/edit/${data.id}`);
  } catch (err) {
    if (isRedirectError(err)) throw err;
    const message = err instanceof Error ? err.message : "Something went wrong";
    return { error: message };
  }
}

export async function saveDraft(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return savePost(formData, "draft");
}

export async function publishPost(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return savePost(formData, "published");
}

export async function deletePost(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const { supabase } = await requireAdmin();
    const id = String(formData.get("id") ?? "");
    if (!id) return { error: "Missing post id" };

    const { data: existing } = await supabase
      .from("posts")
      .select("slug")
      .eq("id", id)
      .maybeSingle();

    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      return { error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/admin");
    if (existing?.slug) {
      revalidatePath(`/blog/${existing.slug}`);
    }
    redirect("/admin");
  } catch (err) {
    if (isRedirectError(err)) throw err;
    const message = err instanceof Error ? err.message : "Delete failed";
    return { error: message };
  }
}
