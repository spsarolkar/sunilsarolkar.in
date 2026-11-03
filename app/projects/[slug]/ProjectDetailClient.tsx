import Header from "../../header";
import Link from "next/link";

interface Project {
  slug: string;
  title: string;
  category?: string;
  img?: string;
  content?: string;
  description: string;
  tech_stack?: string[];
  externalLink?: string;
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const hasDetails = Boolean(project.tech_stack?.length || project.externalLink);
  return (
    <article className="wrap lab-page">
      <Link href="/projects" className="back-link">← All projects</Link>
      <Header title={project.title} subtitle={project.description} eyebrow="From the workbench" />
      <div className={`detail-grid${hasDetails ? "" : " solo"}`}>
        <section className="content-section">
          <h2>About the project</h2>
          <div className="prose-copy">
            {project.content
              ? <div dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, "<br/>") }} />
              : <p>{project.description}</p>}
          </div>
          {project.img && <img className="detail-image" src={project.img} alt={project.title} />}
        </section>
        {hasDetails && (
          <aside className="detail-aside" aria-label="Project details">
            <h2>On this project</h2>
            {Boolean(project.tech_stack?.length) && (
              <div>
                <p className="eyebrow rust">Built with</p>
                <div className="lab-tags">
                  {project.tech_stack?.map((tech) => <span key={tech} className="lab-tag">{tech}</span>)}
                </div>
              </div>
            )}
            {project.externalLink && <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="lab-button">Open project ↗</a>}
          </aside>
        )}
      </div>
    </article>
  );
}
