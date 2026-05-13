"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  author_name: string;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function preview(content: string) {
  const plain = content.replace(/\n+/g, " ").trim();
  return plain.length > 120 ? plain.slice(0, 120) + "…" : plain;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then(r => r.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="empty-state">
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="home-header">
        <h1 className="home-title">
          Stories worth <span>sharing.</span>
        </h1>
        <p className="home-sub">
          Tap any post to read. Share with one tap on WhatsApp.
        </p>
      </header>
      {posts.length === 0 ? (
        <div className="empty-state">
          <h3>No posts yet</h3>
          <p>
            <Link href="/create" style={{ color: "var(--pink)", fontWeight: 500 }}>
              Write something →
            </Link>
          </p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`} className="post-card">
              <div className="post-card-meta">
                {formatDate(post.created_at)} · {post.author_name || "Anonymous"}
              </div>
              <h2 className="post-card-title">{post.title}</h2>
              <p className="post-card-preview">{preview(post.content)}</p>
              <span className="post-card-read">Read more →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}      <header className="home-header">
        <h1 className="home-title">Stories worth <span>sharing.</span></h1>
        <p className="home-sub">Tap any post to read. Share with one tap on WhatsApp.</p>
      </header>
      {loading ? (
        <div className="empty-state"><p>Loading posts...</p></div>
      ) : posts.length === 0 ? (
        <div className="empty-state">
          <h3>No posts yet</h3>
          <p><Link href="/create" style={{ color: "var(--pink)", fontWeight: 500 }}>Write something →</Link></p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`} className="post-card">
              <div className="post-card-meta">{formatDate(post.created_at)} · {post.author_name || "Anonymous"}</div>
              <h2 className="post-card-title">{post.title}</h2>
              <p className="post-card-preview">{preview(post.content)}</p>
              <span className="post-card-read">Read more →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
            }          ))}
        </div>
      )}
    </div>
  );
}
