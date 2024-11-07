import { fetchPosts } from "@/lib/services";

export default async function BlogList() {
  const posts = await fetchPosts();
  return (
    <div>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
