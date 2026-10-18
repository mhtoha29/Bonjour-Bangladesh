import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InteriorHero, InteriorShell, InquiryBand } from "@/components/interior-shell";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { brand, staticPages } from "@/content/site-content";
import { publicRobots } from "@/lib/seo";
import { getFoundation } from "@/lib/foundation";
import { WhyBonjour } from "@/components/why-bonjour";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

const reviewPages: Record<string, { eyebrow: string; title: string; lead: string }> = {
  "factory-partners": { eyebrow: "REVIEW DRAFT", title: "Selected manufacturing partners.", lead: "A partner gallery will be published when facility images, captions, permission and current capability information have been approved. Bonjour Bangladesh does not present partner facilities as company-owned factories." },
  "cookie-policy": { eyebrow: "LEGAL REVIEW", title: "Cookie policy under review.", lead: "This notice will be completed after the analytics and AI tools used on the deployed website have been approved." },
};

const legalDrafts = {
  "privacy-policy": {
    title: "Privacy policy draft",
    lead: "The client-provided privacy wording is included for review. It is not a final notice until the deployed inquiry, AI, analytics and email services are documented.",
    sections: [
      { title: "Information submitted", body: "The client draft covers information sent through the website, including a buyer's name, company details, email, phone number and product requirements. The live notice must also describe uploaded tech packs and any AI-chat records." },
      { title: "Intended use", body: "The client draft says submitted information is used for business communication, quotations and service-related purposes, and is not sold or intentionally disclosed outside legitimate business purposes or legal requirements." },
      { title: "Before publication", body: "The final notice needs confirmed service providers, storage locations, retention periods, access controls, analytics and cookie details, and contact or deletion-request procedures." },
    ],
  },
  "terms-and-conditions": {
    title: "Website terms and conditions",
    lead: "The client-provided terms are displayed here for review. Commercial arrangements for a specific order take effect only after the relevant terms are mutually agreed.",
    sections: [
      { title: "Website use", body: "This website is for lawful business and informational use. Its content may be updated without prior notice." },
      { title: "Commercial information", body: "Product specifications, availability, pricing and lead times depend on the buyer's requirements and the individual order." },
      { title: "Intellectual property", body: "The Bonjour Bangladesh name, logo, text, photographs, graphics and other original materials may not be copied or commercially used without prior written permission." },
      { title: "Third-party links", body: "External sites linked from this website are outside Bonjour Bangladesh's control, including their content, security and privacy practices." },
      { title: "Governing law", body: "Website use and related matters are subject to the applicable laws of Bangladesh." },
    ],
  },
  disclaimer: {
    title: "Website and inquiry disclaimer",
    lead: "The client-provided disclaimer is displayed here for review before final legal approval.",
    sections: [
      { title: "Website information", body: "We make reasonable efforts to keep information accurate and up to date, but do not guarantee that all information is complete, current or error-free." },
      { title: "Product and facility examples", body: "Images may represent products or production capabilities. Actual specifications and factory availability are confirmed against each buyer's requirements." },
      { title: "Inquiries are not orders", body: "Sending an inquiry does not create a purchase contract or other binding business commitment. Quotations and orders require mutually agreed terms." },
    ],
  },
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = staticPages[slug as keyof typeof staticPages] ?? legalDrafts[slug as keyof typeof legalDrafts] ?? reviewPages[slug];
  if (slug === "about") return { title: "About", description: "Meet Bonjour Bangladesh, a Dhaka-based apparel sourcing partner working through selected manufacturing partners since 2010.", alternates: { canonical: "/about/" }, robots: publicRobots };
  if (slug === "hashmat-ali-foundation") return { title: "Hashmat Ali Foundation", description: "Bonjour Bangladesh's community support initiative for disadvantaged people and people with disabilities.", alternates: { canonical: "/hashmat-ali-foundation/" }, robots: publicRobots };
  if (!page) return {};
  return { title: page.title, description: page.lead, alternates: { canonical: `/${slug}/` }, robots: reviewPages[slug] || slug in legalDrafts ? { index: false, follow: false } : publicRobots };
}

function AboutPage() {
  return (
    <InteriorShell>
      <InteriorHero eyebrow="ABOUT BONJOUR BANGLADESH" title={brand.slogan} lead="Serving international apparel buyers since 2010, we connect product development, reliable sourcing, production follow-up, quality control and shipment coordination." aside={<div className={styles.editorialHeroMedia}><Image src="/editorial/threads-across-borders.webp" alt="Bonjour Bangladesh apparel sourcing network connecting Bangladesh with international markets" fill sizes="(max-width: 800px) 100vw, 38vw" priority /></div>} />
      <section className={styles.story}><div><h2 className={styles.sectionHeadline}>FROM PRODUCT DEVELOPMENT TO SHIPMENT</h2><p className={styles.sectionSubheadline}>The garment comes first.</p></div><div><p>Successful garment sourcing takes more than finding a factory. It requires the right product, manufacturing partner, cost, quality, communication and delivery plan. We work with buyers across the UK, Europe and other markets to make these decisions together.</p><p>Our team reviews designs or tech packs, sources materials and factories, coordinates sampling and costing, follows production, checks quality and supports shipment readiness. Each order is matched to selected manufacturing partners according to the product and buyer requirements.</p></div></section>
      <section id="mission-vision" className={`${styles.purposeSection} reveal`} aria-labelledby="purpose-heading">
        <header className={styles.purposeHeader}><div><p className={styles.kicker}>OUR DIRECTION</p><h2 id="purpose-heading" className={styles.sectionHeadline}>MISSION, VISION &amp; CORE VALUES</h2></div><p>The principles behind every buyer conversation, sourcing decision and production follow-up.</p></header>
        <div className={styles.purposeGrid}>
          <article className={styles.missionCard}><span>MISSION</span><h3>Make apparel sourcing from Bangladesh clearer and more dependable.</h3><p>We coordinate the right product, manufacturing resources, quality process, communication and shipment readiness—helping buyers move from the first brief towards production with confidence.</p></article>
          <article className={styles.visionCard}><span>VISION</span><h3>Be the sourcing partner buyers choose to work with again.</h3><p>We aim to build long-term international relationships through transparent communication, responsible follow-up, consistent performance and practical sourcing solutions.</p></article>
          <article className={styles.valuesCard}><span>CORE VALUES</span><h3>What guides the work.</h3><div className={styles.valuesList}><div><b>Quality first</b><p>Approved requirements stay visible throughout production.</p></div><div><b>Buyer clarity</b><p>Decisions, risks and next steps are communicated clearly.</p></div><div><b>Reliable follow-through</b><p>We stay close to development, production and delivery planning.</p></div><div><b>Responsible sourcing</b><p>Applicable people, product and environmental requirements matter.</p></div><div><b>Long-term trust</b><p>Every order is an opportunity to earn the next conversation.</p></div></div></article>
        </div>
      </section>
      <WhyBonjour compactTop />
      <section className={styles.leadership} aria-labelledby="director-message"><div className={styles.leadershipCopy}><p className={styles.kicker}>A MESSAGE FROM OUR MANAGING DIRECTOR</p><h2 id="director-message" className={styles.sectionHeadline}>Relationships are built in the details.</h2><blockquote>“Every buyer brief deserves honest attention—from the first product conversation to shipment readiness. Since 2010, our purpose has been to make sourcing from Bangladesh clearer, more dependable and more personal. We match the right manufacturing resources, stay close to product development and quality, and communicate what matters at every stage. Our goal is not simply to complete an order, but to earn the confidence behind the next one.”</blockquote><div className={styles.signature}><strong>Syed Moyeenul Farooq</strong><span>Managing Director · Bonjour Bangladesh</span></div><Link href="/contact/">Start a conversation ↗</Link></div><div className={styles.leadershipPortrait}><MediaPlaceholder shape="portrait" tone="stone" label="Managing Director portrait pending" /><div><span>PORTRAIT SLOT</span><strong>Syed Moyeenul Farooq</strong><small>Client-approved photograph to be added.</small></div></div></section>
      <section className={styles.slogan}><p>Our commitment</p><blockquote>{brand.commitment}</blockquote></section>
      <section className={styles.story}><div><h2 className={styles.sectionHeadline}>LONG-TERM PARTNERSHIPS</h2><p className={styles.sectionSubheadline}>Reliable work earns repeat trust.</p></div><div><p>We aim to build long-term buyer relationships through transparent communication, responsible follow-up and consistent performance—not simply complete a single order.</p><p>Share your design, tech pack, fabric specification, quality standard, target price or delivery schedule. We can review a practical sourcing route for your next collection.</p></div></section>
      <InquiryBand title="Discuss your next collection." />
    </InteriorShell>
  );
}

async function FoundationPage() {
  const foundation = await getFoundation();
  const firstPhoto = foundation.gallery.find((item) => item.media)?.media;

  return <InteriorShell>
    <InteriorHero eyebrow="HASHMAT ALI FOUNDATION" title="Supporting people. Creating hope." lead="At Bonjour Bangladesh, we believe success is more meaningful when it can be shared with those who need support." aside={<div className={styles.foundationHeroMedia}>{firstPhoto ? <Image src={firstPhoto.url} alt={firstPhoto.alt} fill sizes="(max-width: 800px) 100vw, 38vw" priority unoptimized /> : <MediaPlaceholder shape="square" tone="linen" label="Client-approved foundation activity photograph pending" displayText="CARE / COMMUNITY" />}</div>} />
    <section className={`${styles.story} ${styles.foundationStory}`}><div><p className={styles.kicker}>OUR PURPOSE</p><h2 className={styles.sectionHeadline}>DIGNITY, COMPASSION &amp; OPPORTUNITY</h2><p className={styles.sectionSubheadline}>Care beyond the supply chain.</p></div><div><p>Through the Hashmat Ali Foundation, we support underprivileged and disadvantaged people, including people with disabilities, providing assistance based on their needs and circumstances.</p><p>Our foundation is committed to contributing to the well-being of vulnerable people and helping create a more caring, inclusive and supportive community.</p><p>We believe everyone deserves dignity, compassion and an opportunity for a better life. Through ongoing charitable activities, we aim to make a positive difference for people facing financial and social challenges.</p></div></section>
    <section className={styles.foundationGallery} aria-labelledby="foundation-gallery-heading"><header><div><p className={styles.kicker}>MAKING A DIFFERENCE</p><h2 id="foundation-gallery-heading" className={styles.sectionHeadline}>COMMUNITY, SEEN WITH CARE.</h2></div><p>Selected moments from the foundation’s ongoing charitable activities—support shaped around individual needs, circumstances and dignity.</p></header><div className={styles.foundationGalleryGrid}>{foundation.gallery.map((item, index) => <figure key={item.slot} className={index === 0 ? styles.foundationGalleryLead : undefined}><div>{item.media ? <Image src={item.media.url} alt={item.media.alt} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 58vw" : "(max-width: 800px) 100vw, 30vw"} unoptimized /> : <MediaPlaceholder shape={index === 0 ? "landscape" : "portrait"} tone={index === 1 ? "sage" : "stone"} label={`Foundation activity photograph ${item.slot} pending`} displayText={`0${item.slot} / COMMUNITY`} />}</div>{item.caption && <figcaption>{item.caption}</figcaption>}</figure>)}</div></section>
    <section className={styles.foundationCommitment}><span>BEYOND BUSINESS</span><div><h2>Our business connects people around the world.</h2><p>Our foundation helps us connect with our community. The Hashmat Ali Foundation is an important part of our commitment to social responsibility and giving back.</p></div></section>
    <section className={styles.slogan}><p>Bonjour Bangladesh &amp; Hashmat Ali Foundation</p><blockquote>Building business. Supporting people. Creating a better tomorrow.</blockquote></section>
    <InquiryBand title="Connect with Bonjour Bangladesh." body="Contact our team to learn more about the company and our community commitments." />
  </InteriorShell>;
}

function EditorialPage({ slug }: { slug: keyof typeof staticPages }) {
  const page = staticPages[slug];
  const heroMedia = slug === "capabilities"
    ? { src: "/editorial/apparel-supply-chain-motion.webp", alt: "Apparel development, materials, production, quality and shipment activities connected in one supply chain" }
    : slug === "quality-compliance"
      ? { src: "/editorial/commitment-quality-logistics.webp", alt: "Bonjour Bangladesh quality inspection and shipment coordination" }
      : null;
  return (
    <InteriorShell>
      <InteriorHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} aside={heroMedia ? <div className={styles.editorialHeroMedia}><Image src={heroMedia.src} alt={heroMedia.alt} fill sizes="(max-width: 800px) 100vw, 38vw" priority /></div> : <MediaPlaceholder shape="square" tone="sage" label="Approved image pending" />} />
      <section className={styles.topicSection}><div className={styles.sectionHeading}><h2 className={styles.sectionHeadline}>IN PRACTICE</h2><p className={styles.sectionSubheadline}>{slug === "capabilities" ? "Connected services for a clearer sourcing path." : slug === "quality-compliance" ? "Explore the standards behind the work." : "What we review with your team."}</p></div>
        <div className={styles.topicGrid}>{page.sections.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p>{"details" in item && item.details && <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}{"href" in item && <Link href={item.href}>Read more ↗</Link>}</article>)}</div>
      </section>
      {slug === "capabilities" && <section className={styles.editorialPrinciple}><p>THE COMPLETE ROUTE</p><h2>The right quality. The right time. The right commitment.</h2><span>Product development, materials, production follow-up, testing, packing and documentation stay connected through one sourcing team.</span></section>}
      {slug === "quality-compliance" && <section className={styles.editorialPrinciple}><p>OUR RESPONSIBILITY METHOD</p><h2>Assess → Verify → Monitor → Correct → Follow up.</h2><span>Sustainability is included where it changes the real sourcing decision: materials, water and energy practices, waste, chemicals, packaging and worker welfare—always reviewed against the specific product, facility and available evidence.</span></section>}
      {slug === "quality-compliance" && <p className={styles.evidenceNote}>Relevant reports and facility documents can be discussed with qualified buyers for a specific order. A public badge is not a substitute for current, facility-level evidence.</p>}
      {slug === "compliance-responsible-sourcing" && <p className={styles.evidenceNote}>An audit framework, membership or partner-facility certificate is not a blanket certification of Bonjour Bangladesh. Scope and evidence must be checked for the specific facility and order.</p>}
      {slug === "sustainability" && <p className={styles.evidenceNote}>We do not state carbon, water-saving or recycled-content figures without product- or facility-specific proof.</p>}
      <InquiryBand title={slug === "quality-control" ? "Share the standards your product must meet." : "Tell us what your product requires."} />
    </InteriorShell>
  );
}

function ReviewPage({ slug }: { slug: string }) {
  const page = reviewPages[slug];
  return <InteriorShell><InteriorHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} /><section className={styles.reviewNotice}><h2>Content is not yet approved for publication.</h2><p>This page is a frontend layout draft. It is excluded from search indexing and will be completed only with verified client material and permissions.</p><Link href="/contact/">Contact Bonjour Bangladesh ↗</Link></section></InteriorShell>;
}

function LegalDraftPage({ slug }: { slug: keyof typeof legalDrafts }) {
  const page = legalDrafts[slug];
  return <InteriorShell>
    <InteriorHero eyebrow="CLIENT-SUPPLIED LEGAL DRAFT" title={page.title} lead={page.lead} />
    <div className={styles.legalSections}>{page.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.body}</p></section>)}</div>
    <p className={styles.evidenceNote}>This draft remains excluded from search indexing until the client and a qualified legal reviewer approve the final wording.</p>
    <InquiryBand title="Have a question about these terms?" body={`Contact ${brand.email} for current business arrangements or website-policy questions.`} />
  </InteriorShell>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (slug === "about") return <AboutPage />;
  if (slug === "hashmat-ali-foundation") return <FoundationPage />;
  if (slug in staticPages) return <EditorialPage slug={slug as keyof typeof staticPages} />;
  if (slug in legalDrafts) return <LegalDraftPage slug={slug as keyof typeof legalDrafts} />;
  if (slug in reviewPages) return <ReviewPage slug={slug} />;
  notFound();
}
