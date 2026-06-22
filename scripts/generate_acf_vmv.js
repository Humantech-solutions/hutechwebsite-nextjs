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

const fields = [
  // ── Hero Section ──────────────────────────────────────────────────────────
  createTab("Hero Section"),
  createField("Hero Tagline", "vmv_hero_tagline", "text", "", { default_value: "Our Purpose" }),
  createField("Hero Title", "vmv_hero_title", "text", "", { default_value: "Our Vision, |Mission & ^Values." }),
  createField("Hero Description", "vmv_hero_description", "textarea", "", {
    default_value: "At Hutech Solutions, we are driven by a singular purpose: to empower businesses through transformative technology and unwavering commitment to excellence."
  }),

  // ── Vision ────────────────────────────────────────────────────────────────
  createTab("Vision"),
  createField("Vision Title", "vmv_vision_title", "text", "", { default_value: "Our Vision" }),
  createField("Vision Description", "vmv_vision_description", "textarea", "", {
    default_value: "To be a globally recognized leader in providing innovative technology solutions that empower businesses and individuals to achieve their full potential and transcend traditional boundaries."
  }),

  // ── Mission ───────────────────────────────────────────────────────────────
  createTab("Mission"),
  createField("Mission Title", "vmv_mission_title", "text", "", { default_value: "Our Mission" }),
  createField("Mission Description", "vmv_mission_description", "textarea", "", {
    default_value: "To deliver high-quality, cost-effective, and customized technology solutions that meet the unique needs of our clients while fostering a culture of continuous improvement, innovation, and employee growth."
  }),

  // ── Core Values ───────────────────────────────────────────────────────────
  createTab("Core Values"),
  createField("Values Section Tagline", "vmv_values_tagline", "text", "", { default_value: "The Pillars of Hutech" }),
  createField("Values Section Title", "vmv_values_title", "text", "", { default_value: "Our ^Core Values" }),
  createField("Values Section Description", "vmv_values_description", "textarea", "", {
    default_value: "The fundamental beliefs that shape our culture and define how we work together to serve our clients."
  }),
  ...Array.from({ length: 6 }).flatMap((_, i) => [
    createField(`Value ${i + 1} Title`, `vmv_value_${i + 1}_title`, "text", "50"),
    createField(`Value ${i + 1} Description`, `vmv_value_${i + 1}_desc`, "textarea", "50"),
  ]),

  // ── CTA Section ───────────────────────────────────────────────────────────
  createTab("CTA Section"),
  createField("CTA Title", "vmv_cta_title", "text", "", {
    default_value: "Join Us in Shaping the ^Future of Technology."
  }),
  createField("CTA Description", "vmv_cta_description", "textarea", "", {
    default_value: "Experience the Hutech difference where values meet innovation to deliver exceptional results."
  }),
  createField("CTA Button 1 Text", "vmv_cta_btn1_text", "text", "50", { default_value: "Partner With Us" }),
  createField("CTA Button 1 URL",  "vmv_cta_btn1_url",  "text", "50", { default_value: "/contact" }),
  createField("CTA Button 2 Text", "vmv_cta_btn2_text", "text", "50", { default_value: "View Careers" }),
  createField("CTA Button 2 URL",  "vmv_cta_btn2_url",  "text", "50", { default_value: "/careers" }),
];

const acfGroup = [
  {
    key: 'group_vmv_page_fields',
    title: 'Vision Mission Values Page Fields',
    fields,
    location: [
      [
        { param: 'page_title', operator: '==', value: 'Vision Mission Values' },
      ],
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'All editable fields for the Vision, Mission & Values page (ACF Free compatible).',
    show_in_graphql: 1,
    graphql_field_name: 'visionMissionValuesPageFields',
  },
];

fs.writeFileSync('scripts/acf-vmv-import.json', JSON.stringify(acfGroup, null, 4));
console.log(`✓ scripts/acf-vmv-import.json created with ${fields.length} fields.`);
