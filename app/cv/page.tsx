import type { Metadata } from "next";
import Header from "../header";
import FormattedText from "../components/FormattedText";
import cv from "../_data/cv.json";

export const metadata: Metadata = {
  title: "Curriculum vitae — AI & Finance",
  description: "Sunil Sarolkar — Principal Solution Architect (AI & GenAI Toolchain), with 16+ years in BFSI, enterprise AI and cloud-native architecture.",
};

const informationLabels: Record<string, string> = {
  fullName: "Full name", role: "Role", location: "Location", focus: "Focus",
};

export default function CvPage() {
  return (
    <article className="wrap lab-page">
      <Header
        eyebrow="AI & Finance"
        title="Experience & learning."
        subtitle={`${cv.generalInformation.role} · ${cv.generalInformation.focus}`}
      />
      <div className="lab-actions">
        <a className="lab-button secondary" href="https://spsarolkar.github.io/" target="_blank" rel="noopener noreferrer">Professional profile ↗</a>
        <a className="lab-link" href="https://www.linkedin.com/in/sunil-sarolkar-451b2023/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a className="lab-link" href="https://github.com/spsarolkar" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      </div>

      <section className="content-section">
        <h2>A quick introduction</h2>
        <div className="prose-copy mb-7"><p>{cv.summary}</p><p>{cv.domainSummary}</p></div>
        <dl className="cv-summary">
          {Object.entries(cv.generalInformation).map(([key, value]) => (
            <div key={key}><dt>{informationLabels[key]}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </section>

      <section className="content-section">
        <h2>Core competencies</h2>
        <div className="cv-summary">
          {cv.coreCompetencies.map((category) => (
            <div key={category.name}>
              <h3 className="eyebrow rust">{category.name}</h3>
              <div className="lab-tags">{category.items.map((skill) => <span className="lab-tag" key={skill}>{skill}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2>Professional experience</h2>
        {cv.professionalExperience.map((job) => (
          <div className="cv-row" key={`${job.institution}-${job.year}`}>
            <p className="cv-year">{job.year}</p>
            <div>
              <h3>{job.title}</h3><p className="institution">{job.institution}</p>
              <div className="prose-copy">{job.description.map((text, i) => <p key={i}><FormattedText text={text} /></p>)}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="content-section">
        <h2>Selected projects</h2>
        {cv.keyProjects.map((project) => (
          <div className="mb-8 last:mb-0" key={project.title}>
            <h3 className="text-2xl mb-2">{project.title}</h3>
            <p className="muted text-sm mb-4">{project.context}</p>
            <div className="prose-copy">{project.description.map((text, i) => <p key={i}>{text}</p>)}</div>
            {"link" in project && <a className="lab-link mt-2" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel} ↗</a>}
          </div>
        ))}
      </section>

      <section className="content-section">
        <h2>Education & certifications</h2>
        {cv.education.map((item) => (
          <div className="education-item" key={`${item.title}-${item.year}`}>
            {item.logo && <img src={item.logo} alt="" width={52} height={52} loading="lazy" />}
            <div>
              <p className="cv-year">{item.year}</p><h3>{item.title}</h3><p className="muted">{item.institution}</p>
              {item.description.length > 0 && <div className="prose-copy mt-3">{item.description.map((text, i) => <p key={i}>{text}</p>)}</div>}
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
