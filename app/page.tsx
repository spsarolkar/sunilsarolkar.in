import { LabPipeline } from "./LabIllustrations";
export default function Home() {
    return (<div className="wrap">


    <section className="hero">
    <div>
    <p className="hello eyebrow">
    <span className="dot"></span>A personal lab · Pune, India</p>
    <h1>Following curiosity.<br /><em>Building along the way.</em></h1>
    <p className="intro">I'm Sunil, a software engineer in Pune. This is where I explore machine learning, build useful things, and follow the occasional trail into the hills.</p>
    <div className="hero-links">
    <a className="solid-link" href="#experiments">Explore the experiments
    <span aria-hidden="true">↓</span></a>
    <a className="quiet-link" href="https://spsarolkar.github.io/" target="_blank" rel="noopener noreferrer">The professional side ↗</a></div></div>
    <aside className="margin-note">
    <div className="eyebrow">On this workbench</div>
    <p>Learning on an iPad.</p>
    <p>Networks inspired by biology.</p>
    <p>Tools for everyday problems.</p>
    <p>And a trail or two.</p></aside></section>

    <section id="experiments">
    <div className="section-heading">
    <p className="eyebrow rust">01 / In the lab</p>
    <span className="right">Questions worth building something for.</span></div>
    <article className="feature">
    <div className="feature-copy">
    <p className="eyebrow">Featured experiment · Research in progress</p>
    <h2>Can an iPad learn<br />to recognise signs?</h2>
    <p>Exploring Indian Sign Language with on-device learning: from video and body landmarks to sequence models. Along the way, I'm testing what brain-inspired circuits can learn about motion.</p>
    <div className="tags">
    <span className="tag">Swift</span>
    <span className="tag">Vision</span>
    <span className="tag">MLX</span>
    <span className="tag">Connectomes</span></div>
    <div className="feature-links">
    <a href="https://github.com/spsarolkar/SignLanguageTranslate" target="_blank" rel="noopener noreferrer">Explore the source ↗</a>
    <a href="/projects/ISL-IndianSignLanguageTranslation">Earlier web demo ↗</a></div>
    <p className="status-note">Still an open question: the motion experiments have not yet established robust recognition.</p></div>
    <div className="diagram"><LabPipeline />
    <p className="diagram-label">A conceptual pipeline, on a single device.</p></div></article></section>

    <section id="projects" className="section">
    <div className="section-heading">
    <h2 className="section-title">A few things I've built.</h2>
    <span className="right">From an idea to something you can explore.</span></div>
    <div className="project-grid">
    <article className="project">
    <div className="project-image schema-image" aria-label="Conceptual transformation from input fields to output fields">
    <div className="schema-box"><strong>INPUT</strong>trade_id: 104<br />amount: 250.00<br />ccy: "INR"</div>
    <span className="schema-arrow" aria-hidden="true">→</span>
    <div className="schema-box"><strong>STRUCTFORMER</strong>transaction_id<br />value<br />currency</div></div>
    <p className="eyebrow">Machine learning / Structured data</p>
    <h3>StructFormer</h3>
    <p>Exploring how Transformer models can learn transformations between structured data formats.</p>
    <a className="project-link" href="/projects/structformer">Explore the project ↗</a></article>
    <article className="project">
    <div className="project-image telemetry-image">
    <img src="/assets/projects/VehicleTelemetry/OBD2_Thumbnail.png" alt="Raspberry Pi vehicle telemetry project" loading="lazy"/></div>
    <p className="eyebrow">Hardware / Data engineering</p>
    <h3>A little curiosity under the bonnet.</h3>
    <p>A Raspberry Pi, a car's OBD-II port, and a way to bring vehicle telemetry into a Python dashboard.</p>
    <a className="project-link" href="/projects/vehicle-telemetry">Explore vehicle telemetry ↗</a></article></div></section>

    <section className="section">
    <div className="section-heading">
    <h2 className="section-title">Small tools, useful detours.</h2>
    <span className="right">Things made to scratch an itch.</span></div>
    <div className="tools">
    <article className="tool">
    <span className="number">01</span>
    <h3>GCP ML mock exam</h3>
    <p>A practice app for the Google Cloud Machine Learning Engineer exam.</p>
    <a href="https://spsarolkar.github.io/ml-cert-mock-exam/" target="_blank" rel="noopener noreferrer">Try the exam app ↗</a></article>
    <article className="tool">
    <span className="number">02</span>
    <h3>Rouge theme preview</h3>
    <p>A visual way to find the right syntax-highlighting theme for a blog.</p>
    <a href="https://spsarolkar.github.io/rouge-theme-preview/" target="_blank" rel="noopener noreferrer">Browse the themes ↗</a></article>
    <article className="tool">
    <span className="number">03</span>
    <h3>Findbugs resource tracker</h3>
    <p>A Java plugin exploring connection leaks that the existing checks missed.</p>
    <a href="https://github.com/spsarolkar/Findbugs_AdResTrackr" target="_blank" rel="noopener noreferrer">View the plugin ↗</a></article></div></section>

    <section id="outside" className="outside">
    <figure>
    <img src="/background/Kuari_pass_mountains_background.jpg" alt="Sunil on a trek with the Himalayan mountains behind him" loading="lazy"/><figcaption>
    <span>Kuari Pass</span>
    <span>A different kind of exploration.</span></figcaption></figure>
    <div>
    <p className="eyebrow rust">02 / Outside the lab</p>
    <h2>Sometimes the best<br />next step is outside.</h2>
    <p>Away from the screen, I enjoy trekking, swimming, and getting lost in a good book. Astrophysics is another rabbit hole I happily fall into.</p>
    <p className="mt-3">The curiosity stays. The scenery changes.</p>
    <div className="interest-list">TRAILS &nbsp;/&nbsp; BOOKS &nbsp;/&nbsp; SWIMMING &nbsp;/&nbsp; THE COSMOS</div></div></section>

    <section className="contact">
    <div>
    <h2>Something sparked a thought?</h2>
    <p>I'd love to hear what you're exploring.</p></div>
    <a href="mailto:sunil.sarolkar@gmail.com">Say hello ↗</a></section>

    </div>);
}
