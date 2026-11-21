import { Suspense } from "react";
import Link from "next/link";
import { getUsers } from "../services/users";

export default function Users() {
  return (
    <div>
      <h2>Users</h2>
      {/* uncached DB read, so with cacheComponents it streams inside <Suspense> */}
      <Suspense fallback={<p>Loading...</p>}>
        <UserList />
      </Suspense>
    </div>
  );
}

async function UserList() {
  const users = await getUsers();
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <Link href={`/users/${user.username}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  );
}
