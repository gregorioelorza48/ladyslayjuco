# Lady Slay JUCO — Women's Athletics Frontend

Next.js 15 + TypeScript frontend for a women's junior college athletics program. Styling uses **plain CSS** (global `globals.css` + CSS Modules). Theme: **black** backgrounds with **pink** text.

## Getting started

```bash
cd ladyslayjuco
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, sports grid, news, recruiting CTA |
| `/sports` | All sports |
| `/sports/[slug]` | Team hub — overview, schedule, roster |
| `/schedule` | Full schedule across sports |
| `/news` | News articles |
| `/recruiting` | Recruiting info + questionnaire form (UI only) |

## Customize

Edit `src/lib/data.ts` for school name, sports, games, rosters, and news. Update CSS variables in `src/app/globals.css` (`--color-black`, `--color-pink`, etc.).

## Stack

- Next.js App Router
- TypeScript
- CSS Modules + global CSS (no Tailwind)
