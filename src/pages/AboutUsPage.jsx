import { AlternatingSections } from "../components/about/AlternatingSections.jsx";
import { BrandTimeline } from "../components/about/BrandTimeline.jsx";
import { JoinUsCallToAction } from "../components/about/JoinUsCallToAction.jsx";
import { TrustProduction } from "../components/about/TrustProduction.jsx";
import { assets } from "../data/content.js";

function AboutHero({ content }) {
  return (
    <section className="about-hero">
      <img src={assets.aboutUsBanner} alt={content.heroTitle} />
      <div className="about-hero-overlay" />
      <div className="about-hero-copy">
        <p className="about-kicker">About Aorace</p>
        <h1>{content.heroTitle}</h1>
        <p>{content.heroSubtitle}</p>
      </div>
    </section>
  );
}

export function AboutUsPage({ t }) {
  const content = t.aboutPage;

  return (
    <main className="about-page">
      <AboutHero content={content} />
      <div className="about-page-shell">
        <AlternatingSections sections={content.sections} />
        <TrustProduction trust={content.trust} />
        <BrandTimeline
          title={content.timelineTitle}
          intro={content.timelineIntro}
          items={content.timeline}
        />
        <JoinUsCallToAction cta={content.cta} />
      </div>
    </main>
  );
}
