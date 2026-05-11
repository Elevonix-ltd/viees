import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "VIEES — Stories Worth Sharing",
  description: "A fast, minimal blogging platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer style={{
          borderTop: "1px solid #E5E7EB",
          padding: "2rem 1rem",
          textAlign: "center",
          marginTop: "2rem"
        }}>
          <p style={{ fontSize: "0.78rem", color: "#6B7280", marginBottom: "0.25rem" }}>
            A Product of <strong style={{ color: "#1a1a2e" }}>Elevonix Limited</strong>
          </p>
          <p style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>
            © {new Date().getFullYear()} Elevonix Limited. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
