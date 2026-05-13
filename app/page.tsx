"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Post { id: string; title: string; content: string; author_name: string; created_at: string; }

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts").then(r=>r.json()).then(d=>{setPosts(d);setLoading(false);}).catch(()=>setLoading(false));
  }, []);

  return (
    <div className="container">
      <header className="home-header">
        <h1 className="home-title">Stories worth <span>sharing.</span></h1>
        <p className="home-sub">Tap any post to read. Share on WhatsApp.</p>
      </header>
      {loading && <div className="empty-state"><p>Loading...</p></div>}
      {!loading && posts.length === 0 && (
        <div className="empty-state">
          <h3>No posts yet</h3>
          <p><Link href="/create" style={{color:"var(--pink)",fontWeight:500}}>Write something →</Link></p>
        </div>
      )}
      {!loading && posts.length > 0 && (
        <div className="post-list">
          {posts.map(post => (
            <Link key={post.id} href={`/post/${post.id}`} className="post-card">
              <div className="post-card-meta">{new Date(post.created_at).toLocaleDateString()} · {post.author_name||"Anonymous"}</div>
              <h2 className="post-card-title">{post.title}</h2>
              <p className="post-card-preview">{post.content.slice(0,120)}...</p>
              <span className="post-card-read">Read more →</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
      }
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
