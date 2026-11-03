import type { Metadata } from "next";
import Link from "next/link";
import Header from "../header";
import projects from "../_data/projects.json";
export const metadata: Metadata = {
    title: "Projects",
    description: "Machine learning experiments, Raspberry Pi telemetry and small useful tools by Sunil Sarolkar.",
};
export default function Projects() {
    return (<div className="wrap lab-page">
      <Header eyebrow="The workbench" title="Ideas, made tangible." subtitle="A collection of experiments, useful tools, and things built to understand a little more. Some are ongoing; others are useful detours along the way."/>
      <div className="project-grid">
        {projects.map((project) => (<article key={project.slug} className="project">
            <Link href={`/projects/${project.slug}`} className="block" tabIndex={-1} aria-hidden="true">
              <div className="project-image">
                {project.img
                ? <img src={project.img} alt="" loading="lazy"/>
                : <span className="project-monogram" aria-hidden="true">{"{ }"}</span>}
              </div>
            </Link>
            <p className="eyebrow">{project.category === "fun" ? "Personal exploration" : "Software & learning"}</p>
            <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
            <p>{project.description}</p>
            {project.tech_stack && <div className="lab-tags">{project.tech_stack.map((tech) => <span className="lab-tag" key={tech}>{tech}</span>)}</div>}
            <Link className="lab-link" href={`/projects/${project.slug}`}>Explore the project <span aria-hidden="true">&nbsp;→</span></Link>
          </article>))}
      </div>
      <aside className="note-panel">
        Looking for my current on-device sign-language experiments? <a className="underline" href="https://github.com/spsarolkar/SignLanguageTranslate" target="_blank" rel="noopener noreferrer">Follow the iPad project on GitHub ↗</a>. The web demo here documents the earlier OpenPose work.
      </aside>
    </div>);
}
