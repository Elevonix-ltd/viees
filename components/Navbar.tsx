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
          <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><defs><linearGradient id="vg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF6B2B"/><stop offset="100%" stopColor="#FF1F78"/></linearGradient></defs><text x="50" y="72" textAnchor="middle" fontSize="72" fontWeight="900" fill="url(#vg)" fontFamily="Georgia,serif">V</text></svg>} />
        </Link>
        <div className="navbar-right">
          <Link href="/create" className="write-btn">Write</Link>
        </div>
      </nav>
      <div className={`drawer-overlay ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-head">
          <div className="logo-circle">
            <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%"}}><defs><linearGradient id="vg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF6B2B"/><stop offset="100%" stopColor="#FF1F78"/></linearGradient></defs><text x="50" y="72" textAnchor="middle" fontSize="72" fontWeight="900" fill="url(#vg)" fontFamily="Georgia,serif">V</text></svg>
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
