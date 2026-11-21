import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { like } from "../../actions/blogs";

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
  const blog = await getBlogById(Number(id));
  if (!blog) notFound();

  return (
    <article data-testid="blog-detail" className="rounded border border-slate-200 bg-white p-6">
      <h2 data-testid="blog-title" className="text-2xl font-bold">
        {blog.title}
      </h2>
      <p data-testid="blog-author" className="mb-3 text-slate-600">
        by {blog.author}
      </p>
      <p className="mb-4">
        <a href={blog.url} className="break-all text-blue-700 hover:underline">
          {blog.url}
        </a>
      </p>
      <form action={like} className="flex items-center gap-3">
        <span>{blog.likes} likes</span>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="btn">
          like
        </button>
      </form>
    </article>
  );
}
