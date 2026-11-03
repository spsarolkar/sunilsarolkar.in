import Link from "next/link";
export const runtime = "edge";
export default function NotFound() {
    return (<div className="wrap lab-page">
      <div className="error-page">
        <p className="eyebrow rust">404 / A small detour</p>
        <h1>This trail ends here.</h1>
        <p className="page-intro">That page couldn't be found. Head back to the lab, or explore a project from the workbench.</p>
        <div className="lab-actions mt-7"><Link className="lab-button" href="/">Back to the lab →</Link><Link className="lab-link" href="/projects">Explore projects</Link></div>
      </div>
    </div>);
}
