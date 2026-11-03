import React from 'react';
import Header from "../../header";
import Link from 'next/link';
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
export default function ProjectDetailClient({ project }: {
    project: Project;
}) {
    return (<article className="wrap lab-page">
            <Link href="/projects" className="back-link">← All projects</Link>
            <Header title={project.title} subtitle={project.description} eyebrow="From the workbench"/>
            {project.img && <img className="detail-image" src={project.img} alt={project.title}/>}

            <div className="detail-grid">
                <section className="content-section pt-0">
                    <h2>About the project</h2>
                    <div className="prose-copy">
                        {project.content ? (<div dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, '<br/>') }}/>) : (<p>{project.description}</p>)}
                    </div>
                </section>

                <aside className="detail-aside">
                        <h2>On this project</h2>

                        {project.tech_stack && (<div>
                                <p className="eyebrow rust">Built with</p>
                                <div className="lab-tags">
                                    {project.tech_stack.map((tech, idx) => (<span key={idx} className="lab-tag">
                                            {tech}
                                        </span>))}
                                </div>
                            </div>)}

                        {project.externalLink && (<div>
                                <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="lab-button">
                                    Open project ↗
                                </a>
                            </div>)}

                        <div className="mt-6">
                            <Link href="/projects" className="lab-link">
                                ← Back to projects
                            </Link>
                        </div>
                </aside>
            </div>
        </article>);
}
