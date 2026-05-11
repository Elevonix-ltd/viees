import { NextResponse } from "next/server";
import { createPost, getPosts } from "@/lib/posts";

export async function GET() {
  return NextResponse.json(getPosts());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, content } = body;
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content required" }, { status: 400 });
  }
  const post = createPost(title, content);
  return NextResponse.json(post, { status: 201 });
}
