const fs = require('fs');

function createField(label, name, type = "text", width = "", extra = {}) {
  // Use a predictable key using a hash of the name to avoid random regenerations
  const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(36);
  return {
    key: `field_${name}_${nameHash}`,
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
  const tabName = label.replace(/\s+/g, "_").toLowerCase();
  const nameHash = tabName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(36);
  return {
    key: `field_tab_${tabName}_${nameHash}`,
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
  createField("Hero Tagline", "awards_hero_tagline", "text", "", { default_value: "Our Milestones" }),
  createField("Hero Title", "awards_hero_title", "text", "", { default_value: "Awards & |Recognition." }),
  createField("Hero Description", "awards_hero_description", "textarea", "", {
    default_value: "Celebrating a legacy of excellence and the relentless pursuit of innovation that defines Hutech Solutions."
  }),
  createField("Hero Background Image", "awards_hero_bg_image", "image", "", {
    return_format: "array",
    preview_size: "medium",
    library: "all"
  }),

  // ── Journey Section ───────────────────────────────────────────────────────
  createTab("Journey Section"),
  createField("Journey Tagline", "awards_journey_tagline", "text", "", { default_value: "Milestones" }),
  createField("Journey Title", "awards_journey_title", "text", "", { default_value: "A Journey of Distinction" }),
  createField("Journey Description", "awards_journey_description", "textarea", "", { default_value: "" }),

  // Repeater list of up to 12 awards (compatible with ACF Free)
  ...Array.from({ length: 12 }).flatMap((_, i) => {
    const idx = i + 1;
    return [
      createField(`Award ${idx} Title`, `awards_award_${idx}_title`, "text", "33"),
      createField(`Award ${idx} Year`, `awards_award_${idx}_year`, "text", "33"),
      createField(`Award ${idx} Issuer`, `awards_award_${idx}_issuer`, "text", "33"),
      createField(`Award ${idx} Description`, `awards_award_${idx}_desc`, "textarea", "50"),
      createField(`Award ${idx} Icon`, `awards_award_${idx}_icon`, "select", "50", {
        choices: {
          Trophy: "Trophy Icon",
          Zap: "Zap Icon",
          Star: "Star Icon",
          Globe: "Globe Icon",
          ShieldCheck: "Shield Check Icon",
          Medal: "Medal Icon",
          Award: "Award Icon"
        },
        default_value: idx % 6 === 1 ? "Trophy" : idx % 6 === 2 ? "Zap" : idx % 6 === 3 ? "Star" : idx % 6 === 4 ? "Globe" : idx % 6 === 5 ? "ShieldCheck" : "Medal",
        allow_null: 0,
        multiple: 0,
        ui: 0,
        return_format: "value"
      }),
      createField(`Award ${idx} External Link`, `awards_award_${idx}_link`, "text", "100", { instructions: "Optional external link for the award" })
    ];
  }),

  // ── Featured Section ──────────────────────────────────────────────────────
  createTab("Featured Section"),
  createField("Featured Title", "awards_featured_title", "text", "", { default_value: "Recognized for |Global Excellence." }),
  createField("Featured Description", "awards_featured_description", "textarea", "", {
    default_value: "Our journey is marked by certifications and recognitions that validate our engineering prowess and operational maturity. From ISO standards to premier partnership tiers with tech giants, we ensure our clients work with the best."
  }),
  createField("Featured Image", "awards_featured_image", "image", "", {
    return_format: "array",
    preview_size: "medium",
    library: "all"
  }),

  // Stats (up to 4 stats)
  ...Array.from({ length: 4 }).flatMap((_, i) => {
    const idx = i + 1;
    const defLabels = ["ISO Certified", "Global Reach", "Elite Partners", "Satisfaction"];
    const defVals = ["9001 & 27001", "12+ Countries", "AWS, Azure, GCP", "98% Client Retention"];
    return [
      createField(`Stat ${idx} Label`, `awards_stat_${idx}_label`, "text", "50", { default_value: defLabels[i] || "" }),
      createField(`Stat ${idx} Value`, `awards_stat_${idx}_value`, "text", "50", { default_value: defVals[i] || "" }),
    ];
  }),

  // ── CTA Section ───────────────────────────────────────────────────────────
  createTab("CTA Section"),
  createField("CTA Title", "awards_cta_title", "text", "", { default_value: "Join our award-winning |journey." }),
  createField("CTA Button 1 Text", "awards_cta_btn1_text", "text", "50", { default_value: "Explore Case Studies" }),
  createField("CTA Button 1 URL",  "awards_cta_btn1_url",  "text", "50", { default_value: "/resources/case-studies" }),
  createField("CTA Button 2 Text", "awards_cta_btn2_text", "text", "50", { default_value: "Partner With Us" }),
  createField("CTA Button 2 URL",  "awards_cta_btn2_url",  "text", "50", { default_value: "/contact" })
];

const acfGroup = [
  {
    key: 'group_awards_page_fields',
    title: 'Awards Page Fields',
    fields,
    location: [
      [
        { param: 'page_title', operator: '==', value: 'awards' }
      ],
      [
        { param: 'page_title', operator: '==', value: 'Awards' }
      ],
      [
        { param: 'page_title', operator: '==', value: 'Awards & Recognition' }
      ],
      [
        { param: 'page_slug', operator: '==', value: 'awards' }
      ]
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'All editable fields for the Awards and Recognition page (ACF Free compatible).',
    show_in_graphql: 1,
    graphql_field_name: 'awardsPageFields',
  },
];

fs.writeFileSync('scripts/acf-awards-page-import.json', JSON.stringify(acfGroup, null, 4));
console.log(`✓ scripts/acf-awards-page-import.json created with ${fields.length} fields.`);
