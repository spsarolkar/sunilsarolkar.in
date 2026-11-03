import Link from "next/link";
import Header from "../header";
import type { ProjectDetails } from "../_data/projectDetails";
import "./detailed-project.css";

type Project = { title: string; description: string; slug: string };

export default function DetailedProject({ project, details }: { project: Project; details: ProjectDetails }) {
  const sections = [
    { id: "overview", title: "Overview" },
    ...details.sections,
    ...details.diagrams.map(diagram => ({ id: diagram.id, title: "Diagram" })),
    ...(details.example ? [{ id: "example", title: "Example" }] : []),
    ...(details.screenshots?.length ? [{ id: "screenshots", title: "Screenshots" }] : []),
    ...(details.limits?.length ? [{ id: "notes", title: "Notes" }] : []),
  ];
  return <article className="wrap lab-page project-story">
    <Link href="/projects" className="back-link">← All projects</Link>
    <Header eyebrow="From the workbench" title={details.title} subtitle={project.description} />
    <div className="lab-actions story-actions">
      {details.links.map(link => <a key={link.url} className={link.primary ? "lab-button" : "lab-link"} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}
    </div>
    <nav className="section-nav story-navigation" aria-label="Project sections">
      {sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
    </nav>

    <section id="overview" className="content-section">
      <h2>Project overview</h2>
      <div className="prose-copy">{details.intro.map(text => <p key={text}>{text}</p>)}</div>
    </section>
    {details.sections.map(section => <section className="content-section" id={section.id} key={section.id}>
      <h2>{section.title}</h2>
      <div className="prose-copy">
        {section.paragraphs?.map(text => <p key={text}>{text}</p>)}
        {section.bullets?.length ? <ul>{section.bullets.map(text => <li key={text}>{text}</li>)}</ul> : null}
      </div>
    </section>)}

    {details.diagrams.map(diagram => <section className="content-section" id={diagram.id} key={diagram.id}>
      <h2 id={`${diagram.id}-title`}>{diagram.title}</h2>
      <figure className="project-flow" aria-labelledby={`${diagram.id}-title`}>
        <figcaption className="prose-copy">{diagram.description}</figcaption>
        {diagram.lanes.map(lane => <div className="project-flow-lane" key={lane.name}>
          <h3>{lane.name}</h3>
          <ol className="project-flow-steps" role="list" aria-label={lane.name}>
            {lane.steps.map((step, index) => <li key={step.title}>
              <span className="flow-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h4>{step.title}</h4><p>{step.description}</p>
            </li>)}
          </ol>
        </div>)}
        {diagram.caption && <p className="flow-caption">{diagram.caption}</p>}
      </figure>
    </section>)}

    {details.example && <section id="example" className="content-section">
      <h2>{details.example.title}</h2>
      <p className="prose-copy">{details.example.intro}</p>
      <div className="project-example-grid">
        {details.example.panels.map(panel => <figure key={panel.label}>
          <figcaption>{panel.label}<span>{panel.language}</span></figcaption>
          <pre tabIndex={0} aria-label={`${panel.label}, ${panel.language}; scroll horizontally if needed`}><code>{panel.code}</code></pre>
        </figure>)}
      </div>
      {details.example.note && <p className="prose-copy mt-5">{details.example.note}</p>}
    </section>}

    {details.screenshots?.length ? <section id="screenshots" className="content-section">
      <h2>From the original project</h2>
      <p className="prose-copy">Historical screenshots from the project articles. Open an image to view it at full size.</p>
      <div className="project-screenshot-grid">
        {details.screenshots.map(screenshot => <figure key={screenshot.src}>
          <a href={screenshot.src} target="_blank" rel="noopener noreferrer" aria-label={`Open screenshot: ${screenshot.alt}`}><img src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} loading="lazy" /></a>
          <figcaption>{screenshot.caption}</figcaption>
        </figure>)}
      </div>
    </section> : null}

    {details.limits?.length ? <section id="notes" className="content-section project-notes">
      <h2>Project notes</h2>
      <div className="prose-copy">{details.limits.map(text => <p key={text}>{text}</p>)}</div>
    </section> : null}
  </article>;
}
