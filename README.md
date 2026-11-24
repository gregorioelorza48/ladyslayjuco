# Lady Slay D123 — Women's Athletics Frontend

Next.js 15 + TypeScript frontend for a women's athletics program. Styling uses **plain CSS** (global `globals.css` + CSS Modules). Theme: **black** backgrounds with **pink** text.

Short-form **Latest** posts are stored in **Supabase** (database, auth, image storage). Static **News** articles remain in `src/lib/data.ts`.

## Getting started

```bash
cd ladyslayjuco
npm install
cp .env.example .env.local
# Fill in Supabase URL, anon key, and ADMIN_EMAIL
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Add these in **`.env.local`** (local) and **Vercel → Project → Settings → Environment Variables** (production):

| Variable | Where | Purpose |
|----------|--------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + server | Public anon key (RLS enforced) |
| `ADMIN_EMAIL` | Server only | Only this email can use `/admin` and mutate posts |
| `NEXT_PUBLIC_SITE_URL` | Server (recommended in prod) | Site origin for magic-link redirects, e.g. `https://ladyslayd123.vercel.app` |

Do **not** add `SUPABASE_SERVICE_ROLE_KEY` to this app or commit any secrets. `.env*.local` is gitignored.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](supabase/schema.sql) in the SQL Editor (replace `YOUR_ADMIN_EMAIL@example.com` with your email — same as `ADMIN_EMAIL`).
3. Authentication → Providers → enable Email (magic link).
4. Authentication → URL configuration:
   - Site URL: `https://ladyslayd123.vercel.app`
   - Redirect URLs:
     - `http://localhost:3000/auth/callback`
     - `https://ladyslayd123.vercel.app/auth/callback`
5. Authentication → Email Templates → **Magic Link** — set the button/link URL to:

```html
<a href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email&next=/admin">Log in</a>
```

6. Confirm the `post-images` storage bucket exists (created by the SQL).

Then open `/admin/login`, request a magic link, and publish a test post. Open the email on the same device when possible.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, Latest feed, stats, sports, static news |
| `/blog/[slug]` | Public short-form post (shareable) |
| `/admin` | Admin post list (magic-link auth) |
| `/admin/login` | Magic-link login |
| `/admin/new` | Create post |
| `/admin/edit/[id]` | Edit / delete post |
| `/sports` | All sports |
| `/sports/[slug]` | Team hub |
| `/schedule` | Full schedule |
| `/news` | Static news articles |
| `/recruiting` | Recruiting info + questionnaire form (UI only) |

## Customize

Edit `src/lib/data.ts` for school name, sports, games, rosters, and static news. Update CSS variables in `src/app/globals.css`.

## Stack

- Next.js App Router
- TypeScript
- CSS Modules + global CSS (no Tailwind)
- Supabase (Postgres + Auth + Storage) for Latest posts
