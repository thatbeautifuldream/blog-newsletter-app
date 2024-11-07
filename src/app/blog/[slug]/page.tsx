import { fetchPostBySlug } from "@/lib/services";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  return (
    <div>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  );
}
