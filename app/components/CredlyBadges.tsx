"use client";

import { useEffect, useState } from "react";
import savedBadges from "../_data/credly-badges.json";
import { CREDLY_PROFILE_URL, loadCredlyBadges, normaliseBadges } from "./credlyData";
import "./credly-badges.css";

export default function CredlyBadges({ preview = false }: { preview?: boolean }) {
  const [badges, setBadges] = useState(() => normaliseBadges(savedBadges));
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;
    const timeout = setTimeout(() => controller.abort(), 10000);
    loadCredlyBadges(fetch, controller.signal)
      .then((latest) => { if (mounted) setBadges(latest); })
      .catch(() => { if (mounted) setUnavailable(true); })
      .finally(() => clearTimeout(timeout));
    return () => { mounted = false; clearTimeout(timeout); controller.abort(); };
  }, []);

  const visible = preview ? badges.slice(0, 6) : badges;
  return (
    <section id="credly-badges" className={`credly-section ${preview ? "section" : "content-section"}`} aria-labelledby="credly-heading">
      <div className="credly-heading">
        <div>
          <p className="eyebrow rust">Continuous learning</p>
          <h2 id="credly-heading">{preview ? "Learning along the way." : "Credly badges & certifications"}</h2>
        </div>
        {preview && <a className="credly-all" href="/cv#credly-badges">View all {badges.length} badges</a>}
      </div>
      <p className="credly-intro">Public credentials and hands-on learning, from cloud foundations to applied AI.</p>
      <ul className={`credly-grid${preview ? " credly-preview" : ""}`} role="list">
        {visible.map((badge) => (
          <li key={badge.id}>
            <a className="credly-card" href={badge.url} target="_blank" rel="noopener noreferrer">
              <img src={badge.image} alt="" width={96} height={96} loading="lazy" />
              <div>
                <h3>{badge.name}</h3>
                {badge.issuer && <p className="credly-issuer">{badge.issuer}</p>}
                {badge.issued && <p className="credly-date">Issued {badge.issuedLabel}</p>}
              </div>
            </a>
          </li>
        ))}
      </ul>
      <p className="credly-source"><a href={CREDLY_PROFILE_URL} target="_blank" rel="noopener noreferrer">View my Credly profile</a></p>
      {unavailable && <p className="credly-notice" role="status">Showing saved badges while the latest collection is unavailable. You can also check the Credly profile above.</p>}
    </section>
  );
}
