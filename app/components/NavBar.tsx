"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import NavLink from "./NavLink";
import { useNotification } from "./NotificationContext";

export default function NavBar() {
  const { data: session, status } = useSession();
  const { notify } = useNotification();
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    notify("logged out");
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="mb-4 flex flex-wrap items-center gap-1 bg-slate-800 px-4 py-2 text-white">
      <NavLink href="/">home</NavLink>
      <NavLink href="/blogs">blogs</NavLink>
      <NavLink href="/users">users</NavLink>
      {status === "authenticated" && (
        <>
          <NavLink href="/blogs/new">create new</NavLink>
          <NavLink href="/me">me</NavLink>
          <span className="ml-auto mr-2 text-slate-300">{session.user?.name} logged in</span>
          <button
            onClick={logout}
            className="cursor-pointer rounded bg-red-600 px-3 py-1.5 font-semibold hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            logout
          </button>
        </>
      )}
      {status === "unauthenticated" && (
        <span className="ml-auto flex gap-1">
          <NavLink href="/login">login</NavLink>
          <NavLink href="/register">register</NavLink>
        </span>
      )}
    </nav>
  );
}
