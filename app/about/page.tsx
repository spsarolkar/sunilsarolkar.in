import type { Metadata } from "next";
import Link from "next/link";
import Header from "../header";
export const metadata: Metadata = { title: "About", description: "A little about Sunil Sarolkar and the curiosity behind this personal lab." };
export default function About() {
    return (<article className="wrap lab-page">
      <Header eyebrow="Outside the lab" title="Hello, I'm Sunil." subtitle="A software engineer in Pune, following questions through code, experiments, and the occasional mountain trail."/>
      <div className="about-grid">
        <div className="prose-copy">
          <p>This is my personal lab: a place for machine-learning experiments, small tools, and projects that help me understand something a little better.</p>
          <p>I'm exploring on-device learning for Indian Sign Language, alongside questions about what brain-inspired networks can learn from motion. It's work in progress, with the source and experiments available to explore.</p>
          <h2 className="mt-8 mb-4 text-3xl">Away from the keyboard.</h2>
          <p>I enjoy trekking, swimming, and getting lost in a good book. Astrophysics is another rabbit hole I happily fall into. The curiosity stays; the scenery changes.</p>
          <h2 className="mt-8 mb-4 text-3xl">The professional side.</h2>
          <p>For my career background, certifications, and professional writing, visit <a href="https://spsarolkar.github.io/" target="_blank" rel="noopener noreferrer">my professional profile ↗</a>, or browse the <Link href="/cv">CV here</Link>.</p>
          <div className="lab-actions mt-7"><Link className="lab-button" href="/projects">Explore the projects →</Link><a className="lab-link" href="mailto:sunil.sarolkar@gmail.com">Say hello ↗</a></div>
        </div>
        <figure className="outside-photo"><img src="/background/Kuari_pass_mountains_background.jpg" alt="Sunil trekking with the Himalayan mountains behind him"/><figcaption><span>Kuari Pass</span><span>A different kind of exploration.</span></figcaption></figure>
      </div>
    </article>);
}
