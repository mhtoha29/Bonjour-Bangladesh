export const brand = {
  name: "Bonjour Bangladesh",
  slogan: "Your Trusted Garment Buying House & Sourcing Partner in Bangladesh",
  commitment: "The right quality. The right time. The right commitment.",
  email: "farooq@bonjourbangladesh.com",
  phoneDisplay: "+880 1798 775477",
  phoneHref: "+8801798775477",
  whatsapp: "https://wa.me/8801798775477",
  socialProfiles: {
    linkedin: "https://www.linkedin.com/company/bonjourbangladesh/home/",
    x: "https://x.com/BonjourBD",
    instagram: "https://www.instagram.com/bonjourbd/?hl=en",
    facebook: "https://www.facebook.com/TheBonjourBangladesh/",
    pinterest: "https://www.pinterest.com/BonjourBangladesh26/",
  },
  address: "House 8, Road 6/A, Sector 4, Uttara, Dhaka 1230, Bangladesh",
} as const;

export const audiences = [
  { slug: "men", label: "Men", title: "Men’s apparel", description: "Knit, woven and fully fashioned directions for men’s collections." },
  { slug: "women", label: "Women", title: "Women’s apparel", description: "Garments developed around fabric, silhouette, fit and finish." },
  { slug: "kids", label: "Kids", title: "Kids’ apparel", description: "Children’s styles with comfort, fit and applicable safety requirements in mind." },
] as const;

export const constructions = [
  { slug: "knit", label: "Knit" },
  { slug: "woven", label: "Woven" },
  { slug: "fully-fashioned-knitwear", label: "Fully Fashioned Knitwear" },
] as const;

// Client-supplied reference artwork; publication requires facility-level evidence and mark-use approval.
export const certificationMarks = [
  { name: "amfori BSCI", src: "/certifications/bsci.jpeg", kind: "standard" },
  { name: "GOTS", src: "/certifications/gots.jpeg", kind: "standard" },
  { name: "ISO", src: "/certifications/iso.jpeg", kind: "standard" },
  { name: "OEKO-TEX", src: "/certifications/oeko-tex.jpeg", kind: "standard" },
  { name: "Sedex", src: "/certifications/sedex.jpeg", kind: "standard" },
  { name: "WRAP", src: "/certifications/wrap.webp", kind: "standard" },
  { name: "Bangladesh Government", src: "/certifications/bangladesh-government.webp", kind: "document" },
  { name: "Bangladesh Bank", src: "/certifications/bangladesh-bank.webp", kind: "document" },
] as const;

export const services = [
  { title: "Factory & vendor sourcing", body: "We identify suitable manufacturing partners based on product capability, quality requirements, technical fit, compliance needs and timing.", teaser: "Manufacturing partners matched to your product, quality, compliance and timing.", cover: "/services/factory-vendor-sourcing.webp", details: ["Knit, woven, denim and sweater capability", "Capacity, technical and delivery review", "Buyer-specific compliance fit"] },
  { title: "Product & sample development", body: "Specifications, materials, patterns, sample revisions and approvals are coordinated towards a production-ready garment.", teaser: "Samples, fit and specifications refined towards a production-ready garment.", cover: "/services/product-sample-development.webp", details: ["Proto, fit, PP, size-set and photo samples", "Pattern, grading and measurement support", "Revisions and approval follow-up"] },
  { title: "Fabric, yarn & accessories", body: "Materials and trims are explored against the garment, quality expectations and cost parameters in the buyer’s brief.", teaser: "Fabric, yarn and trims explored against your brief and cost parameters.", cover: "/services/fabric-yarn-accessories.webp", details: ["Fabric, yarn, trims and accessories", "Material development and quality checks", "Buyer-approved preferred materials where suitable"] },
  { title: "Production follow-up", body: "Communication stays active around approved specifications, materials, progress and potential risks.", teaser: "Production progress and emerging risks kept visible through active follow-up.", cover: "/services/production-follow-up.webp", details: ["Material and approval readiness", "Workmanship, progress and capacity", "Risk, corrective-action and shipment follow-up"] },
  { title: "Quality assurance & control", body: "Checks are coordinated at relevant stages using agreed buyer standards and inspection procedures.", teaser: "Relevant-stage checks aligned with your approved quality standards.", cover: "/services/quality-assurance-control.webp", details: ["Pre-production and material review", "Inline, measurement and workmanship checks", "AQL-based final inspection where agreed"] },
  { title: "Testing & product requirements", body: "Where required, we help coordinate laboratory testing and documentation for the product and destination market.", teaser: "Testing and documentation coordinated where the product and market require them.", cover: "/services/testing-product-requirements.webp", details: ["Composition, colour fastness and shrinkage", "Pilling, strength, GSM and performance", "Product- and market-specific test scope"] },
  { title: "Documentation & shipment", body: "We follow up on packing, relevant documents and shipment readiness according to buyer instructions.", teaser: "Packing, documents and shipment readiness followed to your instructions.", cover: "/services/documentation-shipment.webp", details: ["Packing and commercial documentation", "Buyer-specific shipping requirements", "Dispatch and logistics coordination"] },
] as const;

export const process = [
  { title: "Share the brief", body: "A concept, reference image or tech pack gives us the starting point." },
  { title: "Match the resources", body: "Review suitable manufacturing partners, materials and initial costing needs." },
  { title: "Develop the product", body: "Coordinate samples, specifications, fit and approvals." },
  { title: "Follow production", body: "Keep progress, questions and emerging risks visible." },
  { title: "Check quality", body: "Plan the agreed inspection and testing checkpoints." },
  { title: "Coordinate shipment", body: "Follow packing, documentation and dispatch readiness." },
] as const;

export const qualityStages = [
  { title: "Pre-production quality review", body: "Align approved samples, tech packs, measurement charts, materials, labels, buyer comments and timelines before bulk production." },
  { title: "Raw material & fabric inspection", body: "Follow fabric, yarn, trims and packaging approvals, including relevant colour, GSM, shrinkage and construction checks." },
  { title: "Production monitoring", body: "Maintain factory follow-up on workmanship, measurements, colour consistency, finishing and buyer-specific requirements." },
  { title: "Inline quality inspection", body: "Check garments during production so recurring defects can be corrected before they spread." },
  { title: "Measurement & fit control", body: "Compare critical measurement points, size-set consistency and fit comments with approved tolerances." },
  { title: "Workmanship & appearance", body: "Review seams, stitching, finishing, prints, embroidery, trims, labels and overall garment appearance." },
  { title: "AQL-based final inspection", body: "Where applicable, inspect finished goods to the buyer's agreed procedure and AQL requirements." },
  { title: "Laboratory testing", body: "Coordinate buyer-required tests such as composition, colour fastness, shrinkage, pilling or fabric strength." },
  { title: "Corrective action & follow-up", body: "Identify, report and correct issues, then re-inspect affected work where appropriate." },
  { title: "Packing & pre-shipment", body: "Follow size stickers, labels, carton assortment, shipping marks and final shipment readiness." },
] as const;

export const complianceTopics = [
  { title: "Social & ethical compliance", body: "Discuss worker welfare, ethical employment, working hours, non-discrimination and applicable labour requirements with the selected facility." },
  { title: "Health & workplace safety", body: "Follow relevant fire, electrical, emergency-preparedness, first-aid and machinery-safety requirements." },
  { title: "Environmental responsibility", body: "Review applicable practices for waste, water, energy, emissions, chemicals and environmental permits." },
  { title: "Chemical management", body: "Coordinate buyer RSL or MRSL requirements, handling controls and relevant testing or documentation." },
  { title: "Product safety & technical compliance", body: "Clarify fibre, labelling, origin, measurement, construction and children's safety requirements where applicable." },
  { title: "Factory assessment & audits", body: "Support buyer-specific assessments, third-party audits and corrective-action follow-up where required." },
  { title: "Documentation & traceability", body: "Coordinate relevant factory, audit, testing, inspection, approval and shipment records for the order." },
  { title: "Buyer-specific compliance", body: "Agree the requirements for the product, facility and destination market rather than applying one blanket programme." },
] as const;

export const sustainabilityTopics = [
  { title: "Preferred materials", body: "Explore organic cotton, recycled polyester and other preferred fibres where suitable and backed by required documentation." },
  { title: "Water management", body: "Discuss responsible use, treatment, reuse and applicable environmental requirements for relevant processes." },
  { title: "Energy efficiency", body: "Consider process efficiency, equipment, lighting and available renewable-energy options at the selected facility." },
  { title: "Waste reduction & recycling", body: "Support better material planning, cutting-waste reduction, segregation and responsible disposal." },
  { title: "Chemical management", body: "Review buyer RSL or MRSL requirements, chemical handling and relevant product testing." },
  { title: "Efficient production", body: "Quality follow-up and first-time-right production can reduce rework, rejects and avoidable resource use." },
  { title: "Responsible packaging", body: "Consider recyclable materials, reduced packaging and efficient cartons where buyer and product needs allow." },
  { title: "People & workplaces", body: "Keep worker welfare, health and safety, non-discrimination and applicable labour requirements in view." },
] as const;

export const faqGroups = [
  {
    title: "Working with Bonjour",
    items: [
      { question: "What is Bonjour Bangladesh?", answer: "A Dhaka-based garment buying house and apparel sourcing partner coordinating development, factory selection, production follow-up, quality and shipment readiness for international buyers." },
      { question: "How long have you been operating?", answer: "Bonjour Bangladesh has served apparel buyers since 2010." },
      { question: "Which markets do you work with?", answer: "We work with international apparel buyers, particularly across the UK and Europe, as well as other markets. Each destination's product and compliance requirements are reviewed for the order." },
      { question: "How do we start working together?", answer: "Share a brief. We review the product, discuss sourcing and development, agree the scope, then coordinate the relevant stages from sampling to shipment readiness." },
    ],
  },
  {
    title: "Products & development",
    items: [
      { question: "What garments can you source?", answer: "Men’s, women’s and kids’ knit, woven and fully fashioned apparel, including suitable casual, fashion, activewear, denim and outerwear styles, depending on partner capability." },
      { question: "Can we send a design or tech pack?", answer: "Yes. A tech pack, sketch, specification sheet, reference photo or product concept gives our team a starting point for development review." },
      { question: "Can you arrange samples?", answer: "We can coordinate relevant development, fit, size-set, pre-production or photo samples according to the product and agreed scope." },
      { question: "What is your MOQ?", answer: "There is no universal MOQ. It depends on the product, fabric, colour, construction and selected facility, so we assess it per inquiry." },
      { question: "Can you source fabrics and accessories?", answer: "We can coordinate fabric, yarn, trim and accessory sourcing against the product specification and target requirements." },
      { question: "Can you support a factory we already use?", answer: "This can be discussed for production follow-up, merchandising, QC or shipment coordination, depending on scope and access." },
    ],
  },
  {
    title: "Quality & responsibility",
    items: [
      { question: "How is a factory selected?", answer: "We consider product expertise, capacity, technical capability, quality, compliance, cost and delivery requirements before recommending a partner." },
      { question: "How do you manage quality?", answer: "Relevant checkpoints can include pre-production review, material checks, inline inspection, measurements, workmanship, final inspection and packing checks." },
      { question: "Do you conduct AQL inspections?", answer: "Where required, the agreed AQL level and inspection procedure are applied to the relevant order." },
      { question: "What happens when a quality issue is found?", answer: "The issue is communicated to the manufacturing partner, corrective action is followed up and affected work is re-checked where appropriate." },
      { question: "Can you coordinate laboratory testing?", answer: "Yes, when required for a product or buyer programme. Tests are selected against the relevant specification and market requirements." },
      { question: "Can you support compliance requirements?", answer: "We review buyer, product, facility and destination-market requirements and coordinate applicable follow-up with the partner facility." },
      { question: "Can you explore preferred or recycled materials?", answer: "Yes, where suitable materials and supporting documentation are available for the product and buyer requirements." },
    ],
  },
  {
    title: "Production & inquiry",
    items: [
      { question: "How is production followed up?", answer: "Our team communicates with the partner facility about progress, materials, approvals, workmanship, risks and shipment readiness." },
      { question: "Can you meet our required shipment date?", answer: "We plan and follow up against an agreed schedule, while communicating risks and feasibility rather than making an unconditional guarantee." },
      { question: "Do you coordinate shipping documents?", answer: "We can coordinate relevant packing, shipping and buyer-specific documents with the parties responsible for the order." },
      { question: "What should we include in an inquiry?", answer: "Product type, image or tech pack, fabric, approximate quantity, colours, size range, destination, target date and quality or compliance requirements help us assess your brief. Send what you have." },
      { question: "How do we request a quotation?", answer: "Use the product inquiry or Request a Quote page, or contact the team by email or WhatsApp. We review the requirements before discussing costing and next steps." },
    ],
  },
] as const;

export const staticPages = {
  capabilities: {
    eyebrow: "OUR SERVICES",
    title: "End-to-end garment sourcing and production support.",
    lead: "From the initial product concept to final shipment, we coordinate sourcing, sampling, materials, production, quality, testing and documentation with a focus on cost, communication and on-time delivery.",
    sections: services,
  },
  "quality-compliance": {
    eyebrow: "QUALITY & RESPONSIBILITY",
    title: "Quality and responsible sourcing, considered together.",
    lead: "A successful garment must meet its approved specification and the requirements attached to its manufacturing route. We coordinate both conversations with the selected partner facility.",
    sections: [
      { title: "Quality control", body: "Staged checks from pre-production to final inspection, aligned to the product and the agreed buyer standard.", href: "/quality-control/", details: ["Pre-production and raw-material review", "Inline, measurement and workmanship control", "Final inspection, CAP and packing checks"] },
      { title: "Responsible sourcing", body: "Requirements matched to buyer, product, facility and destination market.", href: "/compliance-responsible-sourcing/", details: ["Social and ethical requirements", "Workplace safety and factory assessments", "Chemical, product and document controls"] },
      { title: "Sustainability", body: "Material and process options reviewed for practicality and supporting evidence.", href: "/sustainability/", details: ["Preferred materials and evidence", "Water, energy, waste and chemical practices", "Packaging, worker welfare and continuous improvement"] },
    ],
  },
  "quality-control": {
    eyebrow: "QUALITY CONTROL & ASSURANCE",
    title: "Quality is built into every stage of production.",
    lead: "Prevent problems. Monitor production. Protect quality. Our team follows approved requirements from raw materials and pre-production through inline checks, final inspection and shipment readiness.",
    sections: qualityStages,
  },
  "compliance-responsible-sourcing": {
    eyebrow: "COMPLIANCE & RESPONSIBLE SOURCING",
    title: "Responsible sourcing. Ethical standards. Buyer confidence.",
    lead: "We assess, verify, monitor, correct and follow up on applicable buyer requirements with selected manufacturing partners. The scope depends on the product, facility and destination market.",
    sections: complianceTopics,
  },
  sustainability: {
    eyebrow: "SUSTAINABILITY",
    title: "Building a more responsible apparel supply chain.",
    lead: "Better materials. Better processes. Better choices. We work with buyers and manufacturing partners to examine product-specific material, resource, chemical, packaging and worker-welfare requirements.",
    sections: sustainabilityTopics,
  },
} as const;
