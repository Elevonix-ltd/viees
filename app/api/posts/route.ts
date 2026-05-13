import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, content, author_name, author_bio, author_photo, author_social } = body;
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content required" }, { status: 400 });
  }
  const id = Date.now().toString();
  const { data, error } = await supabase
    .from('posts')
    .insert([{ id, title, content, author_name: author_name || 'Anonymous', author_bio: author_bio || '', author_photo: author_photo || '', author_social: author_social || '' }])
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
