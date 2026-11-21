import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "../../services/users";

export default function UserPage({ params }: PageProps<"/users/[username]">) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <User params={params} />
    </Suspense>
  );
}

async function User({ params }: Pick<PageProps<"/users/[username]">, "params">) {
  const { username } = await params;
  const user = await getUserWithBlogs(username);
  if (!user) notFound();

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
