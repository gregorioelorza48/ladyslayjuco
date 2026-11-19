"use server";

import { PAGE_SIZE, type Post } from "@/lib/post-shared";
import { getPublishedPosts } from "@/lib/posts";

export async function loadMorePublishedPosts(
  offset: number,
): Promise<{ posts: Post[]; total: number }> {
  return getPublishedPosts(offset, PAGE_SIZE);
}
