-- Fix infinite recursion on admin_allowlist RLS.
-- Run this once in the Supabase SQL Editor.

drop policy if exists "Admins can read allowlist" on public.admin_allowlist;

-- Users may only read their own allowlist row (no self-subquery).
create policy "Users can read own allowlist row"
  on public.admin_allowlist
  for select
  to authenticated
  using (email = (auth.jwt() ->> 'email'));
