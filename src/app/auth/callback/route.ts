import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const nextParam = searchParams.get("next") ?? "/admin";
  const next = nextParam.startsWith("/") ? nextParam : "/admin";
  const authError =
    searchParams.get("error_description") || searchParams.get("error");

  if (authError) {
    return NextResponse.redirect(
      `${origin}/admin/login?error=auth&detail=${encodeURIComponent(authError)}`,
    );
  }

  const supabase = await createClient();

  // Preferred for email links: works even if opened in another browser/app.
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    return NextResponse.redirect(
      `${origin}/admin/login?error=auth&detail=${encodeURIComponent(error.message)}`,
    );
  }

  // PKCE flow (same-browser only)
  const code = searchParams.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    return NextResponse.redirect(
      `${origin}/admin/login?error=auth&detail=${encodeURIComponent(error.message)}`,
    );
  }

  return NextResponse.redirect(
    `${origin}/admin/login?error=auth&detail=${encodeURIComponent(
      "Missing login code. Request a new magic link and open it in the same browser.",
    )}`,
  );
}
