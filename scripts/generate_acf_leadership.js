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
  createField("Hero Tagline", "lead_hero_tagline", "text", "", { default_value: "The Executive Bench" }),
  createField("Hero Title", "lead_hero_title", "text", "", { default_value: "The ^Visionaries." }),
  createField("Hero Description", "lead_hero_description", "textarea", "", {
    default_value: '"Leadership at Hutech is about enabling the brilliance of our engineers to solve the world\'s most complex digital challenges."'
  }),
  imgField("Hero Background Image", "lead_hero_bg_image"),

  // ── Main Leadership Grid ──────────────────────────────────────────────────
  createTab("Main Leadership Grid"),
  ...Array.from({ length: 9 }).flatMap((_, i) => [
    createField(`Leader ${i + 1} Name`, `lead_leader_${i + 1}_name`, "text", "50"),
    createField(`Leader ${i + 1} Role`, `lead_leader_${i + 1}_role`, "text", "50"),
    imgField(`Leader ${i + 1} Image`, `lead_leader_${i + 1}_img`, { wrapper: { width: "50" } }),
    createField(`Leader ${i + 1} Bio`, `lead_leader_${i + 1}_bio`, "textarea", "50"),
    createField(`Leader ${i + 1} Linkedin URL`, `lead_leader_${i + 1}_linkedin`, "url", "50"),
    imgField(`Leader ${i + 1} Linkedin Icon`, `lead_leader_${i + 1}_linkedin_icon`, { wrapper: { width: "50" } }),
    createField(`Leader ${i + 1} Twitter URL`, `lead_leader_${i + 1}_twitter`, "url", "50"),
    imgField(`Leader ${i + 1} Twitter Icon`, `lead_leader_${i + 1}_twitter_icon`, { wrapper: { width: "50" } }),
  ]),

  // ── Advisory Board Section ────────────────────────────────────────────────
  createTab("Advisory Board Section"),
  createField("Advisory Title", "lead_advisory_title", "text", "", { default_value: "Board of |~Advisors." }),
  createField("Advisory Description", "lead_advisory_description", "textarea", "", {
    default_value: "Our strategic direction is refined by a global board of industry veterans who bring decades of leadership experience from the world's most successful organizations."
  }),
  createField("Advisory Button Text", "lead_advisory_btn_text", "text", "50", { default_value: "Engage with Us" }),
  createField("Advisory Button URL", "lead_advisory_btn_url", "text", "50", { default_value: "/contact" }),
  ...Array.from({ length: 6 }).flatMap((_, i) => [
    createField(`Advisor ${i + 1} Name`, `lead_advisor_${i + 1}_name`, "text", "33"),
    createField(`Advisor ${i + 1} Firm`, `lead_advisor_${i + 1}_firm`, "text", "33"),
    createField(`Advisor ${i + 1} Region`, `lead_advisor_${i + 1}_region`, "text", "33"),
  ]),

  // ── Philosophy Join CTA ───────────────────────────────────────────────────
  createTab("CTA Section"),
  createField("CTA Title", "lead_cta_title", "text", "", {
    default_value: "Lead the Next |^Digital Frontier."
  }),
  createField("CTA Description", "lead_cta_description", "textarea", "", {
    default_value: "We are always looking for visionary leaders to join our executive bench. If you have a passion for engineering excellence and global growth, we want to hear from you."
  }),
  createField("CTA Button 1 Text", "lead_cta_btn1_text", "text", "50", { default_value: "Partner With Us" }),
  createField("CTA Button 1 URL",  "lead_cta_btn1_url",  "text", "50", { default_value: "/contact" }),
  createField("CTA Button 2 Text", "lead_cta_btn2_text", "text", "50", { default_value: "Executive Careers" }),
  createField("CTA Button 2 URL",  "lead_cta_btn2_url",  "text", "50", { default_value: "/careers" }),
];

const acfGroup = [
  {
    key: 'group_leadership_page_fields',
    title: 'Leadership Page Fields',
    fields,
    location: [
      [
        { param: 'page_title', operator: '==', value: 'Leadership' },
      ],
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'All editable fields for the Leadership page (ACF Free compatible).',
    show_in_graphql: 1,
    graphql_field_name: 'leadershipPageFields',
  },
];

fs.writeFileSync('scripts/acf-leadership-import.json', JSON.stringify(acfGroup, null, 4));
console.log(`✓ scripts/acf-leadership-import.json created with ${fields.length} fields.`);
