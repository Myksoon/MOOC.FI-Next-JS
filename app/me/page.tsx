import Link from "next/link";
import { redirect } from "next/navigation";
import { generateToken } from "../actions/users";
import { markBlogAsRead } from "../actions/readingList";
import { getReadingList } from "../services/readingList";
import { getCurrentUser } from "../services/session";

// no streaming here, otherwise the e2e tests find the test ids twice
export const instant = false;

const section = "mb-6 rounded border border-slate-200 bg-white p-6";

export default async function Me() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const list = await getReadingList(user.id);
  const unread = list.filter((entry) => !entry.read);
  const read = list.filter((entry) => entry.read);

  return (
    <div>
      <section data-testid="user-profile" className={section}>
        <h2 className="mb-3 text-2xl font-bold">My Profile</h2>
        <p>
          <span className="font-semibold">Name:</span> <span data-testid="user-name">{user.name}</span>
        </p>
        <p>
          <span className="font-semibold">Username:</span>{" "}
          <span data-testid="user-username">{user.username}</span>
        </p>
      </section>

      <section data-testid="reading-list-section" className={section}>
        <h2 className="mb-3 text-2xl font-bold">Reading List</h2>
        {list.length === 0 ? (
          <p data-testid="empty-reading-list" className="text-slate-600">
            Your reading list is empty.
          </p>
        ) : (
          <>
            <div data-testid="unread-section" className="mb-4">
              <h3 className="mb-2 text-lg font-semibold">Unread ({unread.length})</h3>
              {unread.length === 0 ? (
                <p data-testid="no-unread-blogs" className="text-slate-600">
                  Nothing left to read.
                </p>
              ) : (
                <ul className="divide-y divide-slate-200">
                  {unread.map(({ blog }) => (
                    <li key={blog.id} className="flex items-center justify-between gap-4 py-2">
                      <Link href={`/blogs/${blog.id}`} className="text-blue-700 hover:underline">
                        {blog.title}
                      </Link>
                      <form action={markBlogAsRead}>
                        <input type="hidden" name="blogId" value={blog.id} />
                        <button type="submit" data-testid={`mark-read-${blog.id}`} className="btn btn-green">
                          mark as read
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div data-testid="read-section">
              <h3 className="mb-2 text-lg font-semibold">Read ({read.length})</h3>
              {read.length === 0 ? (
                <p className="text-slate-600">No blogs marked as read yet.</p>
              ) : (
                <ul className="list-disc pl-6">
                  {read.map(({ blog }) => (
                    <li key={blog.id} className="py-1">
                      <Link href={`/blogs/${blog.id}`} className="text-blue-700 hover:underline">
                        {blog.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </section>

      <section data-testid="api-token-section" className={section}>
        <h2 className="mb-3 text-2xl font-bold">API Token</h2>
        {user.token ? (
          <p data-testid="token-display" className="mb-3">
            Your token: <code data-testid="api-token" className="rounded bg-slate-100 px-1.5 py-0.5 break-all">{user.token}</code>
          </p>
        ) : (
          <p data-testid="no-token-message" className="mb-3 text-slate-600">
            No token has been generated yet.
          </p>
        )}
        <form action={generateToken}>
          <button type="submit" data-testid="generate-token-button" className="btn">
            Generate New Token
          </button>
        </form>
      </section>
    </div>
  );
}
