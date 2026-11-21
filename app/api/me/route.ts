import { NextResponse } from "next/server";
import { getUserByToken } from "../../services/users";

export async function GET(request: Request) {
  const [scheme, token] = request.headers.get("authorization")?.split(" ") ?? [];
  const user = scheme === "Bearer" && token ? await getUserByToken(token) : undefined;
  if (!user) return NextResponse.json({ error: "invalid or missing token" }, { status: 401 });

  const { blogs, ...info } = user;
  return NextResponse.json({ ...info, createdBlogs: blogs });
}
