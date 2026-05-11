"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="navbar">
        <button className={`hamburger ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <Link href="/" className="logo-circle" aria-label="VIEES Home">
          <img src="/logo.png" alt="VIEES logo" width={36} height={36} />
        </Link>
        <div className="navbar-right">
          <Link href="/create" className="write-btn">Write</Link>
        </div>
      </nav>
      <div className={`drawer-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-head">
          <div className="logo-circle">
            <img src="/logo.png" alt="VIEES" width={36} height={36} />
          </div>
          <div>
            <div className="drawer-brand">VIEES</div>
            <div className="drawer-tagline">Stories worth sharing</div>
          </div>
        </div>
        <nav className="drawer-nav">
          <div className="drawer-section-label">Navigate</div>
          <Link href="/" className={`drawer-link ${pathname === "/" ? "active" : ""}`}>
            <span className="drawer-link-icon">🏠</span>Home
          </Link>
          <Link href="/create" className={`drawer-link ${pathname === "/create" ? "active" : ""}`}>
            <span className="drawer-link-icon">✏️</span>Write a Post
          </Link>
          <div className="drawer-section-label">About</div>
          <a href="#" className="drawer-link"><span className="drawer-link-icon">💡</span>About VIEES</a>
          <a href="#" className="drawer-link"><span className="drawer-link-icon">📩</span>Contact</a>
        </nav>
      </aside>
    </>
  );
}
