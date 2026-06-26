const fs = require('fs');

function createField(label, name, type = "text", width = "", extra = {}) {
  return {
    key: `field_${name}_${Math.random().toString(36).substr(2, 5)}`,
    label,
    name,
    type,
    instructions: extra.instructions || "",
    required: 0,
    conditional_logic: 0,
    wrapper: { width, class: "", id: "" },
    default_value: extra.default_value || "",
    ...extra
  };
}

function createTab(label) {
  return {
    key: `field_tab_${label.replace(/\s+/g, "_").toLowerCase()}_${Math.random().toString(36).substr(2, 5)}`,
    label,
    name: "",
    type: "tab",
    instructions: "",
    required: 0,
    conditional_logic: 0,
    wrapper: { width: "", class: "", id: "" },
    placement: "top",
    endpoint: 0
  };
}

function imgField(label, name, extra = {}) {
  return createField(label, name, "image", "", {
    return_format: 'object',
    preview_size: 'medium',
    library: 'all',
    ...extra
  });
}

const fields = [
  // ── Hero Section ──────────────────────────────────────────────────────────
  createTab("Hero Section"),
  createField("Hero Tagline", "part_hero_tagline", "text", "", { default_value: "Ecosystem of Excellence" }),
  createField("Hero Title", "part_hero_title", "text", "", { default_value: "Strategic |Technology ^Alliances." }),
  createField("Hero Description", "part_hero_description", "textarea", "", {
    default_value: "We collaborate with the world's leading technology providers to architect, implement, and manage comprehensive digital solutions that empower global enterprises."
  }),
  imgField("Hero Background Image", "part_hero_bg_image"),

  // ── Intro Section ─────────────────────────────────────────────────────────
  createTab("Intro Section"),
  createField("Intro Title", "part_intro_title", "text", "", { default_value: "Architecting |Shared ^Success." }),
  createField("Intro Description", "part_intro_description", "textarea", "", {
    default_value: "At Hutech Solutions, our partnership philosophy is built on mutual growth, shared innovation, and a commitment to delivering exceptional value. We don't just use technology; we build strategic bridges between platforms and business goals."
  }),
  ...Array.from({ length: 4 }).map((_, i) =>
    createField(`Intro Bullet ${i + 1}`, `part_intro_bullet_${i + 1}`, "text", "25", { 
      default_value: ["Accelerated Time-to-Market", "Access to Specialized Labs", "Joint Product Engineering", "Global Scaling Support"][i]
    })
  ),
  imgField("Intro Image", "part_intro_img"),

  // ── Categories Grid ───────────────────────────────────────────────────────
  createTab("Categories Grid"),
  createField("Categories Title", "part_categories_title", "text", "", { default_value: "Partner Ecosystem" }),
  createField("Categories Description", "part_categories_description", "textarea", "", { default_value: "Our alliance network spans across multiple technology domains and industry verticals." }),
  ...Array.from({ length: 3 }).flatMap((_, i) => [
    createField(`Category ${i + 1} Title`, `part_cat_${i + 1}_title`, "text", "33", {
      default_value: ["Cloud & Infrastructure", "Enterprise Solutions", "Data & Intelligence"][i]
    }),
    createField(`Category ${i + 1} Description`, `part_cat_${i + 1}_desc`, "textarea", "33", {
      default_value: [
        "Empowering businesses with scalable, secure, and high-performance cloud ecosystems.",
        "Driving operational excellence through world-class ERP and CRM integrations.",
        "Unlocking actionable insights with advanced analytics and AI-driven platforms."
      ][i]
    }),
    createField(`Category ${i + 1} Partners (comma separated)`, `part_cat_${i + 1}_partners`, "text", "33", {
      default_value: [
        "AWS, Microsoft Azure, Google Cloud, IBM Cloud, DigitalOcean",
        "ServiceNow, SAP, Oracle, Microsoft Dynamics, Salesforce",
        "Snowflake, Databricks, Tableau, Power BI, Cloudera"
      ][i]
    }),
  ]),

  // ── Meet Our Partners ─────────────────────────────────────────────────────
  createTab("Meet Our Partners"),
  createField("Meet Title", "part_meet_title", "text", "", { default_value: "Meet Our Partners" }),
  createField("Meet Description", "part_meet_description", "textarea", "", {
    default_value: "Our partners are industry leaders who share our commitment to innovation and excellence. Together, we combine strengths and leverage cutting-edge solutions to achieve outstanding results. Join us and experience the transformative power of a Hutech Solutions partnership."
  }),
  createField("Meet Button Text", "part_meet_btn_text", "text", "50", { default_value: "Find What You Need" }),
  createField("Meet Button URL", "part_meet_btn_url", "text", "50", { default_value: "/services" }),
  ...Array.from({ length: 9 }).flatMap((_, i) => [
    imgField(`Meet Image ${i + 1}`, `part_meet_img_${i + 1}`, { wrapper: { width: "50" } }),
    createField(`Meet Image ${i + 1} Alt Text`, `part_meet_alt_${i + 1}`, "text", "50", {
      default_value: ["Hutech and Oots Strategic Partnership", "Hutech and Maconsus Strategic Partnership", "Nasscom Membership Certificate"][i] || ""
    }),
  ]),

  // ── Logo Grid ─────────────────────────────────────────────────────────────
  createTab("Logo Grid"),
  ...Array.from({ length: 16 }).flatMap((_, i) => [
    createField(`Logo ${i + 1} Name`, `part_logo_${i + 1}_name`, "text", "50", {
      default_value: ["AWS", "Google Cloud", "Microsoft Azure", "IBM", "ServiceNow", "Oracle", "Snowflake", "SAP"][i] || ""
    }),
    imgField(`Logo ${i + 1} Image`, `part_logo_${i + 1}_img`, { wrapper: { width: "50" } })
  ]),

  // ── Benefits Section ──────────────────────────────────────────────────────
  createTab("Benefits Section"),
  createField("Benefits Title", "part_ben_title", "text", "", { default_value: "Value of |^Association." }),
  imgField("Benefits Image", "part_ben_img"),
  ...Array.from({ length: 4 }).flatMap((_, i) => [
    createField(`Benefit ${i + 1} Title`, `part_ben_${i + 1}_title`, "text", "50", {
      default_value: ["Global Delivery Capabilities", "Co-Innovation Programs", "Strategic Go-to-Market", "Governance & Compliance"][i]
    }),
    createField(`Benefit ${i + 1} Description`, `part_ben_${i + 1}_desc`, "textarea", "50", {
      default_value: [
        "Access our worldwide network of development centers and domain experts.",
        "Work with our R&D teams to build next-generation prototypes and POCs.",
        "Joint marketing and sales initiatives to accelerate market penetration.",
        "Rigorous security standards and multi-region regulatory compliance."
      ][i]
    }),
  ]),

  // ── CTA Section ───────────────────────────────────────────────────────────
  createTab("CTA Section"),
  createField("CTA Title", "part_cta_title", "text", "", { default_value: "Become a |^Strategic Partner." }),
  createField("CTA Description", "part_cta_description", "textarea", "", {
    default_value: "Are you ready to redefine industry standards? Join our ecosystem and leverage our global reach and engineering excellence to scale your business."
  }),
  createField("CTA Inquiry Email", "part_cta_email", "text", "", { default_value: "alliances@hutechsolutions.com" }),
];

const acfGroup = [
  {
    key: 'group_partnership_page_fields',
    title: 'Partnership Page Fields',
    fields,
    location: [
      [
        { param: 'page_title', operator: '==', value: 'Partnership' },
      ],
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'All editable fields for the Partnership page (ACF Free compatible).',
    show_in_graphql: 1,
    graphql_field_name: 'partnershipPageFields',
  },
];

fs.writeFileSync('scripts/acf-partnership-import.json', JSON.stringify(acfGroup, null, 4));
console.log(`✓ scripts/acf-partnership-import.json created with ${fields.length} fields.`);
