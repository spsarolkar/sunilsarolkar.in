import type { Metadata } from "next";
import Header from "../header";
import FormattedText from "../components/FormattedText";
import cv from "../_data/cv.json";
import skills from "../_data/skills.json";
export const metadata: Metadata = { title: "Curriculum vitae", description: "Professional experience, education and interests of Sunil Sarolkar." };
export default function CvPage() {
    return (<article className="wrap lab-page">
      <Header eyebrow="The professional side" title="Experience & learning." subtitle="My background in data engineering, software, and machine learning. For my professional profile and writing, visit GitHub Pages."/>
      <a className="lab-button secondary" href="https://spsarolkar.github.io/" target="_blank" rel="noopener noreferrer">Professional profile ↗</a>

      <section className="content-section">
        <h2>A quick introduction</h2>
        <dl className="cv-summary">
          {Object.entries(cv.generalInformation).map(([key, value]) => (<div key={key}><dt>{({ fullName: "Full name", role: "Role", location: "Location", languages: "Languages" } as Record<string, string>)[key]}</dt><dd>{value}</dd></div>))}
        </dl>
      </section>

      <section className="content-section">
        <h2>Professional experience</h2>
        {cv.professionalExperience.map((job) => (<div className="cv-row" key={`${job.institution}-${job.year}`}>
            <p className="cv-year">{job.year}</p>
            <div><h3>{job.title}</h3><p className="institution">{job.institution}</p><div className="prose-copy">{job.description.map((text, i) => <p key={i}><FormattedText text={text}/></p>)}</div></div>
          </div>))}
      </section>

      <section className="content-section">
        <h2>Education & certifications</h2>
        {cv.education.map((item) => (<div className="education-item" key={`${item.title}-${item.year}`}>
            {item.logo && <img src={item.logo} alt="" width={52} height={52} loading="lazy"/>}
            <div><p className="cv-year">{item.year}</p><h3>{item.title}</h3><p className="muted">{item.institution}</p>{item.description && <div className="prose-copy mt-3">{item.description.map((text, i) => <p key={i}><FormattedText text={text}/></p>)}</div>}</div>
          </div>))}
      </section>

      <section className="content-section">
        <h2>Open-source projects</h2>
        {cv.openSourceProjects.map((project, i) => (<div className="cv-row" key={i}>
            <p className="cv-year">{project.year}</p>
            <div className="prose-copy"><h3><FormattedText text={project.title}/></h3><p><FormattedText text={project.description}/></p></div>
          </div>))}
      </section>

      <section className="content-section">
        <h2>Skills & tools</h2>
        <div className="cv-summary">
          {skills.map((category) => <div key={category.name}><p className="eyebrow rust">{category.name}</p><div className="lab-tags">{category.items.map((skill) => <span className="lab-tag" key={skill.name}>{skill.name}</span>)}</div></div>)}
        </div>
      </section>

      <section className="content-section">
        <h2>Recognition</h2>
        <div className="recognition-grid">
          {cv.internalRecognition.map((badge) => <div key={badge.name}><img src={badge.image} alt="" width={72} height={72} loading="lazy"/><p>{badge.name}</p><p className="muted">{badge.issuer}</p></div>)}
        </div>
        {cv.honorsAndAwards.map((group) => (<div className="cv-row" key={group.year}><p className="cv-year">{group.year}</p><div className="prose-copy">{group.items.map((text, i) => <p key={i}><FormattedText text={text}/></p>)}</div></div>))}
      </section>

      <section className="content-section"><h2>Interests</h2><div className="prose-copy">{cv.interests.map((text, i) => <p key={i}><FormattedText text={text}/></p>)}</div></section>
    </article>);
}
