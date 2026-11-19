-- Fix admin write failures / allowlist recursion.
-- Run once in the Supabase SQL Editor.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowlist
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Allowlist: own row only (no recursive subquery)
drop policy if exists "Admins can read allowlist" on public.admin_allowlist;
drop policy if exists "Users can read own allowlist row" on public.admin_allowlist;
create policy "Users can read own allowlist row"
  on public.admin_allowlist
  for select
  to authenticated
  using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

-- Posts: use is_admin() for writes / admin reads
drop policy if exists "Admins can read all posts" on public.posts;
create policy "Admins can read all posts"
  on public.posts
  for select
  to authenticated
  using (public.is_admin() or status = 'published');

drop policy if exists "Admins can insert posts" on public.posts;
create policy "Admins can insert posts"
  on public.posts
  for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can update posts" on public.posts;
create policy "Admins can update posts"
  on public.posts
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete posts" on public.posts;
create policy "Admins can delete posts"
  on public.posts
  for delete
  to authenticated
  using (public.is_admin());

-- Storage writes
drop policy if exists "Admins upload post images" on storage.objects;
create policy "Admins upload post images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'post-images' and public.is_admin());

drop policy if exists "Admins update post images" on storage.objects;
create policy "Admins update post images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'post-images' and public.is_admin());

drop policy if exists "Admins delete post images" on storage.objects;
create policy "Admins delete post images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'post-images' and public.is_admin());
