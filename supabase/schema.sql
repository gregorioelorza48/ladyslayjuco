-- Lady Slay D123 short-form posts
-- Run this in the Supabase SQL Editor once.
-- 1) Set your admin email in the insert below (must match ADMIN_EMAIL in .env.local).
-- 2) Enable Email (magic link) auth in Authentication → Providers.
-- 3) Add redirect URLs: http://localhost:3000/auth/callback
--    and https://ladyslayd123.vercel.app/auth/callback

create table if not exists public.admin_allowlist (
  email text primary key
);

insert into public.admin_allowlist (email)
values ('gregorioelorza48@gmail.com')
on conflict (email) do nothing;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  headline text,
  body text not null,
  sport text,
  image_url text,
  status text not null default 'draft'
    check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists posts_published_feed_idx
  on public.posts (status, published_at desc nulls last);

-- Helper: check allowlist without RLS recursion
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

alter table public.posts enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Admins can read all posts" on public.posts;
create policy "Admins can read all posts"
  on public.posts
  for select
  to authenticated
  using (public.is_admin());

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

alter table public.admin_allowlist enable row level security;

drop policy if exists "Admins can read allowlist" on public.admin_allowlist;
drop policy if exists "Users can read own allowlist row" on public.admin_allowlist;
create policy "Users can read own allowlist row"
  on public.admin_allowlist
  for select
  to authenticated
  using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read post images" on storage.objects;
create policy "Public read post images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'post-images');

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
