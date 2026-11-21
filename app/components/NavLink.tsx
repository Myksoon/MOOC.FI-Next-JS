"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { href: string; children: React.ReactNode };
const base = "rounded px-3 py-1.5 hover:bg-slate-700";

// the pathname is runtime data on dynamic routes, so the plain link is prerendered
// and only the "active" highlight streams in
export default function NavLink(props: Props) {
  return (
    <Suspense fallback={<Link href={props.href} className={base}>{props.children}</Link>}>
      <ActiveLink {...props} />
    </Suspense>
  );
}

function ActiveLink({ href, children }: Props) {
  const active = usePathname() === href;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${base} ${active ? "bg-slate-700 font-semibold" : ""}`}
    >
      {children}
    </Link>
  );
}
