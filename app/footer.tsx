import Link from "next/link";
export default function Footer() {
    return (<div className="wrap">
      <footer className="foot">
        <p>© {new Date().getFullYear()} Sunil Sarolkar · Made with curiosity.</p>
        <nav className="foot-links" aria-label="Footer navigation">
          <Link href="/about">About</Link>
          <Link href="/cv">CV</Link>
          <a href="https://github.com/spsarolkar" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href="https://spsarolkar.github.io/" target="_blank" rel="noopener noreferrer">Professional profile ↗</a>
        </nav>
      </footer>
    </div>);
}
