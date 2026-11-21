import Link from "next/link";
import { getBlogs } from "../services/blogs";

export default function Blogs() {
  // toSorted returns a copy, so the array in the service is not mutated
  const blogs = getBlogs().toSorted((a, b) => b.likes - a.likes);
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
