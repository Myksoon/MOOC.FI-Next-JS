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
  // filtering (ilike) and sorting (likes desc) happen in the database
  const blogs = await getBlogs(typeof filter === "string" ? filter : "");

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
