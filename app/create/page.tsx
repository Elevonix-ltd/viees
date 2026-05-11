"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), content: content.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/post/${data.id}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="create-page">
        <h1>Write something.</h1>
        <p>Your post will be live instantly. Share it on WhatsApp in one tap.</p>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input id="title" className="form-input" type="text" placeholder="Give your story a title…" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} />
          <p className="char-hint">{title.length} / 120</p>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="content">Content</label>
          <textarea id="content" className="form-textarea" placeholder="What's on your mind?" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button className="submit-btn" onClick={handleSubmit} disabled={!title.trim() || !content.trim() || loading}>
          {loading ? "Publishing…" : "Publish Post →"}
        </button>
      </div>
    </div>
  );
}
