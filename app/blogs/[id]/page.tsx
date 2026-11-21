import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getBlog } from "../../services/blogs";

// params is runtime data, so with cacheComponents it must be read inside <Suspense>
export default function BlogPage({ params }: PageProps<"/blogs/[id]">) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Blog params={params} />
    </Suspense>
  );
}

async function Blog({ params }: Pick<PageProps<"/blogs/[id]">, "params">) {
  const { id } = await params;
  const blog = getBlog(Number(id));
  if (!blog) notFound();

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>by {blog.author}</p>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>{blog.likes} likes</p>
    </div>
  );
}
