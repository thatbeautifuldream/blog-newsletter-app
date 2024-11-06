import { fetchPosts } from "@/lib/services";

export default async function BlogList() {
  const posts = await fetchPosts();
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.url}>
            <a href={`/blog/${post.url.split("/").pop()}`}>{post.title}</a>
            <p>{post.brief}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
