import { Suspense } from "react";
import Link from "next/link";
import { getBlogs } from "../services/blogs";

export default function Blogs({ searchParams }: PageProps<"/blogs">) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Blogs</h2>
      <form action="/blogs" role="search" className="mb-4 flex gap-2">
        <label htmlFor="filter" className="sr-only">
          Search by title
        </label>
        <input
          id="filter"
          name="filter"
          placeholder="Search by title"
          data-testid="filter-input"
          className="flex-1 rounded border border-slate-300 px-3 py-2 focus:border-blue-600 focus:outline-2 focus:outline-blue-600"
        />
        <button type="submit" data-testid="search-button" className="btn">
          search
        </button>
      </form>
      {/* testid outside Suspense so the tests don't match the streamed copy too */}
      <div data-testid="blogs-list">
        <Suspense fallback={<p>Loading...</p>}>
          <BlogList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function BlogList({ searchParams }: Pick<PageProps<"/blogs">, "searchParams">) {
  const { filter } = await searchParams;
  const blogs = await getBlogs(typeof filter === "string" ? filter : "");

  return (
    <ul className="divide-y divide-slate-200 rounded border border-slate-200 bg-white">
      {blogs.map((blog) => (
        <li key={blog.id} className="flex items-baseline justify-between gap-4 px-4 py-3">
          <span>
            <Link href={`/blogs/${blog.id}`} className="font-semibold text-blue-700 hover:underline">
              {blog.title}
            </Link>{" "}
            <span className="text-slate-600">by {blog.author}</span>
          </span>
          <span className="shrink-0 text-sm text-slate-600">{blog.likes} likes</span>
        </li>
      ))}
      {blogs.length === 0 && <li className="px-4 py-3 text-slate-600">No blogs found</li>}
    </ul>
  );
}
