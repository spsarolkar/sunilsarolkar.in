import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../header";
import "./telemetry.css";

export const metadata: Metadata = {
  title: "Vehicle telemetry with Raspberry Pi",
  description: "The original Raspberry Pi and ELM327 vehicle telemetry demo, dashboard screenshots and architecture, with Kafka and Spark extensions marked as planned.",
};

const mediaPath = "/assets/projects/VehicleTelemetry";
const videoUrl = "https://www.youtube.com/watch?v=X3aA26rKwIs";
const architectureUrl = `${mediaPath}/Vehicle_Telemetry_Architecture.png`;
const screenshots = [
  {
    image: "OBD2-Demo.png",
    title: "The instrument console",
    alt: "Original instrument dashboard showing speed, engine RPM and coolant temperature",
    caption: "The original Python dashboard brings the vehicle readings into one instrument display.",
  },
  {
    image: "OBD2-Speed-RPM.png",
    title: "Speed and engine RPM",
    alt: "Dashboard screenshot with a central speed readout and surrounding speed and RPM gauges",
    caption: "A central speed readout sits alongside the speed and engine RPM gauges.",
  },
  {
    image: "OBD2-Speed-Coolant.png",
    title: "Coolant temperature",
    alt: "Dashboard screenshot with the coolant temperature readout above the instrument gauges",
    caption: "The coolant temperature readout appears above the instrument gauges.",
  },
];

export default function VehicleTelemetryPage() {
  return (
    <article className="wrap lab-page telemetry-page">
      <Link href="/projects" className="back-link">← All projects</Link>
      <Header
        eyebrow="Hardware / A personal project"
        title="Vehicle telemetry with Raspberry Pi."
        subtitle="A car’s OBD-II port, an ELM327 Bluetooth adapter, and a Python dashboard on a Raspberry Pi."
      />

      <div className="telemetry-introduction">
        <div className="prose-copy">
          <p>Originally built in 2019 as a hobby project, this console reads vehicle data over Bluetooth and displays speed and engine RPM on the Pi. Here are the original demo, system diagram and dashboard screenshots.</p>
        </div>
        <div className="lab-actions">
          <a className="lab-button" href="#demo">Watch the demo ↓</a>
          <a className="lab-link" href="https://github.com/spsarolkar/Tesla/tree/master" target="_blank" rel="noopener noreferrer">Source on GitHub ↗</a>
        </div>
      </div>

      <nav className="section-nav" aria-label="Vehicle telemetry sections">
        <a href="#demo">Demo video</a>
        <a href="#architecture">Architecture</a>
        <a href="#dashboard">Dashboard views</a>
      </nav>

      <section id="demo" className="content-section">
        <h2>The original demo.</h2>
        <p className="prose-copy">A recording of the Raspberry Pi vehicle telemetry console, using an ELM327 adapter to connect to the car’s OBD-II port.</p>
        <div className="telemetry-video">
          <iframe
            src="https://www.youtube.com/embed/X3aA26rKwIs"
            title="Vehicle Telemetry Console using Raspberry Pi and ELM327 OBD-II Bluetooth"
            width="1600"
            height="900"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <p className="telemetry-media-note">If the player is unavailable, <a href={videoUrl} target="_blank" rel="noopener noreferrer">watch the original video on YouTube ↗</a>.</p>
      </section>

      <section id="architecture" className="content-section">
        <h2>From the car to the console.</h2>
        <div className="prose-copy">
          <p>The local Raspberry Pi dashboard is the implemented part of this project. The original diagram also records a proposed 4G connection to Kafka for telemetry streaming and further analysis.</p>
        </div>
        <figure className="telemetry-architecture">
          <img
            src={architectureUrl}
            alt="Original architecture showing a vehicle connected to a Raspberry Pi over Bluetooth or CAN Bus, with a planned 4G link to Kafka for telemetry and anomaly analysis"
            width={1536}
            height={1024}
            loading="lazy"
          />
          <figcaption>
            <span>Original project architecture, including planned extensions.</span>
            <a className="lab-link" href={architectureUrl} target="_blank" rel="noopener noreferrer">Open full-size diagram ↗</a>
          </figcaption>
        </figure>
        <div className="telemetry-stages">
          <section className="telemetry-stage" aria-labelledby="telemetry-implemented">
            <h3 id="telemetry-implemented">Implemented</h3>
            <ul>
              <li>Read OBD-II data through an ELM327 Bluetooth adapter.</li>
              <li>Run a custom Python instrument dashboard on the Raspberry Pi.</li>
              <li>Display vehicle speed and engine RPM.</li>
            </ul>
          </section>
          <section className="telemetry-stage" aria-labelledby="telemetry-planned">
            <h3 id="telemetry-planned">Planned extensions</h3>
            <ul>
              <li>Send telemetry over a 4G connection to Kafka.</li>
              <li>Use Spark ML for anomaly detection.</li>
              <li>Explore fault prediction with machine learning.</li>
            </ul>
          </section>
        </div>
      </section>

      <section id="dashboard" className="content-section">
        <h2>A closer look at the dashboard.</h2>
        <p className="prose-copy">Retained screenshots from the original console. Open any image to inspect it at its original size.</p>
        <div className="telemetry-gallery">
          {screenshots.map((screenshot) => (
            <figure key={screenshot.image}>
              <a
                href={`${mediaPath}/${screenshot.image}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${screenshot.title.toLowerCase()} screenshot at full size`}
              >
                <img
                  src={`${mediaPath}/${screenshot.image}`}
                  alt={screenshot.alt}
                  width={800}
                  height={480}
                  loading="lazy"
                />
              </a>
              <figcaption>
                <strong>{screenshot.title}</strong>
                <p>{screenshot.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </article>
  );
}
