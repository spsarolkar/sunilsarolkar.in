import type { Metadata } from "next";
import Header from "../header";

export const metadata: Metadata = { title: "Outside the lab" };

export default function PhotoStudy() {
  return (
    <div className="wrap lab-page">
      <Header eyebrow="Photo study" title="Outside the lab." />
      <div className="photo-grid">
        <figure><img src="/background/Torna-wide.jpg" alt="A wide view of the hills" /></figure>
        <figure><img src="/background/AMK.jpg" alt="Mountain scenery" loading="lazy" /></figure>
        <figure><img src="/background/Torna-Dam-View.jpg" alt="A view across the hills and water" loading="lazy" /></figure>
      </div>
    </div>
  );
}
