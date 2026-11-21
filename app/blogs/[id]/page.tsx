import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { like } from "../../actions/blogs";
import { addBlogToReadingList } from "../../actions/readingList";
import { isInReadingList } from "../../services/readingList";
import { getCurrentUser } from "../../services/session";

// Render the whole page before sending it, instead of streaming it into a <Suspense> fallback.
// Streamed content first arrives as a hidden copy, which makes every test id briefly match twice.
export const instant = false;

export default async function BlogPage({ params }: PageProps<"/blogs/[id]">) {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  if (!blog) notFound();

  const user = await getCurrentUser();
  // offered only to logged-in users for blogs someone else added and not yet on their list
  const canAddToList = user && blog.userId !== user.id && !(await isInReadingList(user.id, blog.id));

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
      <div className="flex flex-wrap items-center gap-3">
        <span>likes: {blog.likes}</span>
        <form action={like}>
          <input type="hidden" name="id" value={blog.id} />
          <button type="submit" className="btn">
            like
          </button>
        </form>
        {canAddToList && (
          <form action={addBlogToReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button type="submit" data-testid="add-to-reading-list-button" className="btn btn-green">
              add to reading list
            </button>
          </form>
        )}
      </div>
    </article>
  );
}
