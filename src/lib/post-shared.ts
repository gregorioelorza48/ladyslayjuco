export type PostStatus = "draft" | "published";

export type PostSport = "volleyball" | "basketball" | "soccer" | "softball";

export const POST_SPORT_OPTIONS: { value: PostSport; label: string }[] = [
  { value: "volleyball", label: "Volleyball" },
  { value: "basketball", label: "Basketball" },
  { value: "soccer", label: "Soccer" },
  { value: "softball", label: "Softball" },
];

export interface Post {
  id: string;
  slug: string;
  headline: string | null;
  body: string;
  sport: string | null;
  image_url: string | null;
  status: PostStatus;
  created_at: string;
  published_at: string | null;
}

export const PAGE_SIZE = 10;

export function sportLabel(sport: string | null | undefined): string | null {
  if (!sport) return null;
  const match = POST_SPORT_OPTIONS.find((o) => o.value === sport);
  return match?.label ?? sport;
}

export function formatPostDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function previewBody(body: string, maxChars = 220): string {
  const trimmed = body.trim();
  if (trimmed.length <= maxChars) return trimmed;
  return `${trimmed.slice(0, maxChars).trimEnd()}…`;
}

export function slugifyBase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function makeSlug(headline: string | null, body: string): string {
  const baseSource = (headline?.trim() || body.trim().slice(0, 40) || "post").trim();
  const base = slugifyBase(baseSource) || "post";
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
}
