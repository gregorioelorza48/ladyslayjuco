import ScoreTicker from "@/components/ScoreTicker";
import HomeMagazine from "@/components/HomeMagazine";
import { news } from "@/lib/data";
import { getPublishedPosts, PAGE_SIZE } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { posts: latestPosts, total: latestTotal } = await getPublishedPosts(
    0,
    PAGE_SIZE,
  );

  return (
    <>
      <ScoreTicker />
      <HomeMagazine
        initialPosts={latestPosts}
        total={latestTotal}
        articles={news}
      />
    </>
  );
}
