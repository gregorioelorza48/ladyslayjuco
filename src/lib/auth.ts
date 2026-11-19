import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not configured");
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    throw new Error("Unauthorized");
  }

  if (user.email.toLowerCase().trim() !== adminEmail) {
    throw new Error("Forbidden");
  }

  return { supabase, user };
}

export async function getAdminSession() {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  if (!adminEmail) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;
  if (user.email.toLowerCase().trim() !== adminEmail) return null;
  return user;
}
