import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") ?? "/admin";
  const next = nextParam.startsWith("/") ? nextParam : "/admin";
  const authError = searchParams.get("error_description") || searchParams.get("error");

  if (authError) {
    return NextResponse.redirect(
      `${origin}/admin/login?error=auth&detail=${encodeURIComponent(authError)}`,
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    return NextResponse.redirect(
      `${origin}/admin/login?error=auth&detail=${encodeURIComponent(error.message)}`,
    );
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth`);
}
