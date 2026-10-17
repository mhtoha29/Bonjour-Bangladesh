import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GlobalReach } from "@/components/global-reach";
import { HeroSlideshow, type HeroSlide } from "@/components/hero-slideshow";
import { ServiceGallery } from "@/components/service-gallery";
import { WhoWeAreCarousel } from "@/components/who-we-are-carousel";
import { WhyBonjour } from "@/components/why-bonjour";
import { ProductCard } from "@/components/product-card";
import { previewStyles } from "@/content/catalog-preview";
import { audiences, brand, certificationMarks, constructions, faqGroups, process as sourcingProcess } from "@/content/site-content";
import { getSite, mediaUrl } from "@/lib/site";
import { getProducts, toCatalogStyle } from "@/lib/products";
import { indexingEnabled, publicRobots } from "@/lib/seo";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: site.seo.title ? { absolute: site.seo.title } : "Bonjour Bangladesh",
    description: site.seo.description,
    alternates: { canonical: "/" },
    robots: publicRobots,
  };
}

const collectionSlides: HeroSlide[] = [
  { src: "/hero/01-tropical-golden.webp" },
  { src: "/hero/02-seaside-tee.webp" },
  { src: "/hero/03-cheerful-boardwalk.webp" },
  { src: "/hero/04-tropical-sunset.webp" },
  { src: "/hero/05-outdoor-fleece.webp" },
  { src: "/hero/06-smiling-coastal.webp" },
  { src: "/hero/07-grey-knitwear.webp" },
];

const apparelImages: Record<string, { src: string; alt: string }> = {
  men: { src: "/editorial/men-apparel.webp", alt: "Men’s tropical botanical shirt product direction by the sea" },
  women: { src: "/editorial/women-apparel.webp", alt: "Women’s outdoor fleece product direction in a park" },
  kids: { src: "/editorial/kids-apparel.webp", alt: "Kids’ apparel product direction on a seaside boardwalk" },
};

function SectionIntro({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return <div className={styles.sectionIntro}><h2 className={styles.sectionHeadline}>{eyebrow}</h2><p className={styles.sectionSubheadline}>{title}</p>{lead && <p className={styles.sectionLead}>{lead}</p>}</div>;
}

export default async function Home() {
  const [site, catalog] = await Promise.all([getSite(), getProducts()]);
  const showCertificationArtwork = !indexingEnabled || process.env.CERTIFICATION_MARKS_APPROVED === "true";
  const selectedStyles = catalog.liveCount ? catalog.products.slice(0, 4).map(toCatalogStyle) : previewStyles.slice(0, 4);
  const heroSlides = site.hero.media
    ? [{ src: mediaUrl(site.hero.media.url), mobileSrc: site.hero.mobileMedia ? mediaUrl(site.hero.mobileMedia.url) : undefined }, ...collectionSlides.slice(1)]
    : collectionSlides;
  return (
    <>
      <main id="main-content" className={styles.page}>
        <section className={styles.heroStage} aria-label="Bonjour Bangladesh introduction">
          <SiteHeader overlay navigation={site.navigation} />
          <div className={styles.frame}>
            <HeroSlideshow slides={heroSlides} mediaClassName={styles.heroMedia} />
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>{site.hero.eyebrow}</p>
              <h1>{site.hero.title}</h1>
              <p className={styles.description}>{site.hero.description}</p>
              <Link href={site.hero.primaryAction.href} className={styles.primaryAction}>{site.hero.primaryAction.label} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <GlobalReach />
        </section>

        <section className={`${styles.section} ${styles.container} ${styles.whoSection} reveal`} id="who-we-are">
          <div className={styles.whoCopy}>
            <h2 className={styles.sectionHeadline}>WHO WE ARE</h2>
            <p className={styles.sectionSubheadline}>Apparel sourcing built on trust, since 2010.</p>
            <p className={styles.whoStatement}>The right product needs the right manufacturing partner—and attention at every stage.</p>
            <p>Bonjour Bangladesh is a garment buying house and apparel sourcing partner in Bangladesh, serving international buyers since 2010. We work with buyers across the UK, Europe and other markets, coordinating product development, factory and material sourcing, production follow-up, quality inspection and shipment readiness through selected manufacturing partners.</p>
            <div className={styles.whoSignoff}><span><strong>Syed Moyeenul Farooq</strong>Managing Director</span><Link href="/about/" className={styles.textLink}>Meet Bonjour Bangladesh ↗</Link></div>
          </div>
          <WhoWeAreCarousel />
        </section>

        <WhyBonjour />

        <ServiceGallery />

        <section className={`${styles.commitmentSection} reveal`} aria-labelledby="commitment-heading">
          <div className={styles.container}>
            <div className={styles.commitmentCopy}>
              <h2 id="commitment-heading" className={styles.sectionHeadline}>OUR COMMITMENT</h2>
              <p className={styles.commitmentStatement}><span>The right quality.</span><span>The right time.</span><span>The right commitment.</span></p>
              <p className={styles.commitmentLead}>Our goal is to meet the buyer’s approved quality requirements and work towards the agreed shipment date through careful follow-up and clear communication.</p>
            </div>
            <div className={styles.commitmentVisual}><Image src="/editorial/commitment-quality-logistics.webp" alt="Bonjour Bangladesh quality, apparel and logistics coordination" fill sizes="(max-width: 800px) 100vw, 46vw" /></div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.container} ${styles.apparelSection} reveal`}>
          <div className={styles.sectionHeadingRow}><SectionIntro eyebrow="APPAREL RANGE" title="A wide range of apparel. One carefully matched sourcing route." lead="Explore men’s, women’s and kids’ apparel across knit, woven and fully fashioned knitwear. Your design, tech pack and quality standard lead the development." /><Link href="/products/" className={styles.textLink}>View all products ↗</Link></div>
          <div className={styles.audienceGrid}>{audiences.map((audience, index) => (
            <article className={styles.audienceCard} key={audience.slug}>
              <Link href={`/products/${audience.slug}/`} className={styles.audienceMedia} aria-label={`Explore ${audience.title}`}><Image src={apparelImages[audience.slug].src} alt={apparelImages[audience.slug].alt} fill sizes="(max-width: 700px) 100vw, 33vw" /></Link>
              <div className={styles.audienceContent}><span>0{index + 1} / COLLECTION DIRECTION</span><h3><Link href={`/products/${audience.slug}/`}>{audience.title} ↗</Link></h3><p>{audience.description}</p><div className={styles.audienceLinks}>{constructions.map((construction) => <Link key={construction.slug} href={`/products/${audience.slug}/${construction.slug}/`}>{construction.label}</Link>)}</div></div>
            </article>
          ))}</div>
        </section>

        <section className={`${styles.section} ${styles.productSection} reveal`}><div className={styles.container}>
          <div className={styles.sectionHeadingRow}><SectionIntro eyebrow="PRODUCT POSSIBILITIES" title="A selected edit from a much wider product library." lead="Explore featured garment directions here, browse the full dynamic catalogue, or send your own design and specifications for development." /><Link href="/products/" className={styles.textLink}>Explore all products ↗</Link></div>
          {!catalog.liveCount && <p className={styles.stagingNote}>The style cards below are layout previews, not confirmed products. Images and specifications are pending client approval.</p>}
          <div className={styles.productGrid}>{selectedStyles.map((item) => <ProductCard key={item.slug} style={item} preview={!catalog.liveCount} showPreviewBadge={false} />)}</div>
        </div></section>

        <section className={`${styles.section} ${styles.processSection} reveal`}><div className={styles.container}>
          <SectionIntro eyebrow="HOW WE WORK" title="From your brief to shipment readiness." lead="Each order is planned around the agreed product, quality, compliance and delivery requirements." />
          <div className={styles.processGrid}>{sourcingProcess.map((step, index) => <div key={step.title}><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></div>)}</div>
          <Link href="/capabilities/" className={styles.lightLink}>See all services ↗</Link>
        </div></section>

        <section className={`${styles.section} ${styles.container} ${styles.qualitySection} reveal`}>
          <SectionIntro eyebrow="CONFIDENCE BUILT IN" title="Quality and responsibility are part of the sourcing decision." lead="We coordinate quality checks and communicate applicable buyer requirements with selected manufacturing partners—before issues reach the final shipment." />
          <div className={styles.trustGrid}><article><span>01 / QUALITY</span><h3>Quality control</h3><p>From approved specifications and materials to inline checks and final inspection, follow-up is planned around the product and order.</p><Link href="/quality-control/">Explore quality control ↗</Link></article><article><span>02 / RESPONSIBILITY</span><h3>Responsible sourcing</h3><p>Social, workplace, environmental and product requirements are reviewed according to buyer, market and selected facility.</p><Link href="/compliance-responsible-sourcing/">Explore responsible sourcing ↗</Link></article></div>
        </section>

        <section className={`${styles.section} ${styles.certificationSection} reveal`} id="certifications" aria-labelledby="certification-heading"><div className={styles.container}>
          <div className={styles.certificationIntro}><div><h2 id="certification-heading" className={styles.sectionHeadline}>CERTIFICATIONS &amp; PARTNER STANDARDS</h2><p className={styles.sectionSubheadline}>The right evidence for the right factory.</p></div><p>Buyers may require specific social, environmental or product standards. We review the selected manufacturing partner’s current documentation against each order’s requirements.</p></div>
          {showCertificationArtwork && <div className={styles.certificationViewport} aria-label="Client-supplied standard and reference marks"><div className={styles.certificationTrack}>{[...certificationMarks, ...certificationMarks].map((mark, index) => <div className={styles.certificationMark} key={`${mark.name}-${index}`} aria-hidden={index >= certificationMarks.length}><Image src={mark.src} alt={index < certificationMarks.length ? `${mark.name} client-supplied reference artwork` : ""} width={160} height={120} sizes="160px" /><span>{mark.name}</span><small>{mark.kind === "document" ? "Company document reference" : "Partner standard reference"}</small></div>)}</div></div>}
          <p className={styles.certificationNote}>{indexingEnabled ? "Any displayed marks relate to the selected factory, not a blanket certification of Bonjour Bangladesh. Request current facility-specific evidence for your order." : "These client-supplied marks are shown for design review. They do not certify Bonjour Bangladesh; applicable factory-level status and permission to display each mark must be verified before public launch."}</p>
          <Link href="/compliance-responsible-sourcing/" className={styles.textLink}>How we approach compliance ↗</Link>
        </div></section>

        <section className={`${styles.section} ${styles.container} ${styles.sustainabilitySection} reveal`}><div><SectionIntro eyebrow="BETTER CHOICES, WHERE THEY FIT" title="A practical approach to more responsible apparel." lead="Material, chemical, resource and packaging options vary by product and manufacturing partner. We review the choices that fit your requirements and the available evidence." /><Link href="/sustainability/" className={styles.textLink}>Our sustainability approach ↗</Link></div><div className={styles.sustainabilityVisual}><Image src="/editorial/sustainability-supply-chain.webp" alt="Sustainable apparel supply chain collage" fill sizes="(max-width: 700px) 100vw, 40vw" /></div></section>

        <section className={`${styles.section} ${styles.container} ${styles.foundationSection} reveal`}><div><h2 className={styles.sectionHeadline}>BEYOND BUSINESS</h2><p className={styles.sectionSubheadline}>Supporting people. Creating hope.</p></div><div><p>Through the Hashmat Ali Foundation, Bonjour Bangladesh supports underprivileged and disadvantaged people, including people with disabilities, according to their needs and circumstances.</p><Link href="/hashmat-ali-foundation/" className={styles.textLink}>Learn about the foundation ↗</Link></div></section>

        <section className={`${styles.section} ${styles.container} ${styles.faqSection} reveal`}><div><SectionIntro eyebrow="BUYER QUESTIONS" title="The practical details, before you send a brief." /><Link href="/faq/" className={styles.textLink}>Read all FAQs ↗</Link></div><div className={styles.faqList}>{[faqGroups[1].items[1], faqGroups[1].items[3], faqGroups[2].items[1], faqGroups[2].items[5]].map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>

        <section className={`${styles.section} ${styles.container} ${styles.finalCta} reveal`}><h2 className={styles.sectionHeadline}>LET’S TALK ABOUT YOUR NEXT COLLECTION</h2><p className={styles.sectionSubheadline}>Tell us what you’re looking to make.</p><p>A tech pack is helpful, but it is not required. Send your product idea, quantity, destination and timing so our team can discuss what comes next.</p><div><Link href="/request-a-quote/" className={styles.finalPrimary}>Request a Quote <span aria-hidden="true">→</span></Link><a href={brand.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp our team ↗</a><a href={`mailto:${brand.email}`}>Email us ↗</a></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
