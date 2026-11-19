import { createClient } from "@/lib/supabase/server";
import { PAGE_SIZE, type Post } from "@/lib/post-shared";

export * from "@/lib/post-shared";

function supabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function getPublishedPosts(offset = 0, limit = PAGE_SIZE) {
  if (!supabaseConfigured()) {
    return { posts: [] as Post[], total: 0 };
  }

  try {
    const supabase = await createClient();
    const { data, error, count } = await supabase
      .from("posts")
      .select("*", { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("getPublishedPosts", error.message);
      return { posts: [] as Post[], total: 0 };
    }

    return { posts: (data ?? []) as Post[], total: count ?? 0 };
  } catch (error) {
    console.error("getPublishedPosts failed", error);
    return { posts: [] as Post[], total: 0 };
  }
}

export async function getPublishedPostBySlug(slug: string) {
  if (!supabaseConfigured()) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("getPublishedPostBySlug", error.message);
    return null;
  }

  return data as Post | null;
}

export async function getAllPostsForAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllPostsForAdmin", error.message);
    return [] as Post[];
  }

  return (data ?? []) as Post[];
}

export async function getPostByIdForAdmin(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getPostByIdForAdmin", error.message);
    return null;
  }

  return data as Post | null;
}
