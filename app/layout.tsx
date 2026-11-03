import type { Metadata } from "next";
import "./globals.css";
import SiteNavigation from "./SiteNavigation";
import Footer from "./footer";
export const metadata: Metadata = {
    metadataBase: new URL("https://sunilsarolkar.in"),
    title: { default: "Sunil Sarolkar — A personal lab", template: "%s · Sunil Sarolkar" },
    description: "Experiments in machine learning, useful software, and a few trails into the hills. A personal lab by Sunil Sarolkar, Pune.",
};
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="en" data-theme="light">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteNavigation />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>);
}
