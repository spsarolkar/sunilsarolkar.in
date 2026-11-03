"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteNavigation() {
  const pathname = usePathname();
  return (
    <div className="wrap">
      <header className="top">
        <Link className="brand" href="/" aria-label="Sunil Sarolkar — home">
          <span className="brand-mark" aria-hidden="true">s.</span>Sunil Sarolkar
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/#experiments">Experiments</Link>
          <Link href="/projects" aria-current={pathname.startsWith("/projects") ? "page" : undefined}>Projects</Link>
          <Link href="/cv" aria-current={pathname === "/cv" ? "page" : undefined}>CV</Link>
          <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
        </nav>
        <a className="professional" href="https://spsarolkar.github.io/" target="_blank" rel="noopener noreferrer" aria-label="Professional profile (opens in a new tab)">
          <span className="profile-full">Professional profile ↗</span>
          <span className="profile-short">Profile ↗</span>
        </a>
      </header>
    </div>
  );
}
