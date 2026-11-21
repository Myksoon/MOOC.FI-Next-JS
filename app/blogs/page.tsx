import { Suspense } from "react";
import Link from "next/link";
import { getBlogs } from "../services/blogs";

export default function Blogs({ searchParams }: PageProps<"/blogs">) {
  return (
    <div>
      <h2>Blogs</h2>
      <form action="/blogs">
        <input name="filter" />
        <button type="submit">search</button>
      </form>
      {/* searchParams is runtime data, so with cacheComponents it must be read inside <Suspense> */}
      <Suspense fallback={<p>Loading...</p>}>
        <BlogList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function BlogList({ searchParams }: Pick<PageProps<"/blogs">, "searchParams">) {
  const { filter } = await searchParams;
  const query = typeof filter === "string" ? filter.toLowerCase() : "";

  // filter returns a new array, and toSorted a copy, so the service array is not mutated
  const blogs = getBlogs()
    .filter((blog) => blog.title.toLowerCase().includes(query))
    .toSorted((a, b) => b.likes - a.likes);

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
        </li>
      ))}
    </ul>
  );
}
