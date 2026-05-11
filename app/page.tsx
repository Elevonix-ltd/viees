import Link from "next/link";
import { getPosts } from "@/lib/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function preview(content: string, max = 120) {
  const plain = content.replace(/\n+/g, " ").trim();
  return plain.length > max ? plain.slice(0, max) + "…" : plain;
}

export default function HomePage() {
  const posts = getPosts();
  return (
    <div className="container">
      <header className="home-header">
        <h1 className="home-title">Stories worth <span>sharing.</span></h1>
        <p className="home-sub">Tap any post to read. Share with one tap on WhatsApp.</p>
      </header>
      {posts.length === 0 ? (
        <div className="empty-state">
          <h3>No posts yet</h3>
          <p><Link href="/create" style={{ color: "var(--pink)", fontWeight: 500 }}>Write something →</Link></p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`} className="post-card">
              <div className="post-card-meta">{formatDate(post.createdAt)}</div>
              <h2 className="post-card-title">{post.title}</h2>
              <p className="post-card-preview">{preview(post.content)}</p>
              <span className="post-card-read">Read more →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
