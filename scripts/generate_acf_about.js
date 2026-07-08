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
  createTab("Hero Section"),
  createField("Hero Tagline", "hero_tagline", "text", "", { default_value: "Corporate Profile" }),
  createField("Hero Title", "hero_title", "text", "", { default_value: "Architecting |Business Value." }),
  createField("Hero Description", "hero_description", "textarea", "", { default_value: "We are a remarkable group of creatives..." }),
  imgField("Hero Background Image", "hero_bg_image"),
  ...Array.from({ length: 6 }).flatMap((_, i) => [
    createField(`Hero Stat ${i + 1} Value`, `hero_stat_${i + 1}_value`, "text", "50"),
    createField(`Hero Stat ${i + 1} Label`, `hero_stat_${i + 1}_label`, "text", "50")
  ]),

  createTab("Strategic Overview"),
  createField("Overview Title", "overview_title", "text"),
  createField("Overview Description", "overview_description", "textarea"),
  ...Array.from({ length: 4 }).flatMap((_, i) => [
    createField(`Overview Feature ${i + 1} Title`, `overview_feature_${i + 1}_title`, "text", "50"),
    createField(`Overview Feature ${i + 1} Description`, `overview_feature_${i + 1}_desc`, "textarea", "50")
  ]),

  createTab("What We Do"),
  createField("What We Do Title", "what_we_do_title", "text"),
  createField("What We Do Description", "what_we_do_desc", "textarea"),
  ...Array.from({ length: 4 }).map((_, i) =>
    createField(`What We Do Bullet ${i + 1}`, `what_we_do_bullet_${i + 1}`, "text", "50")
  ),

  createTab("Who We Help"),
  createField("Who We Help Title", "who_we_help_title", "text"),
  createField("Who We Help Description", "who_we_help_desc", "textarea"),
  ...Array.from({ length: 4 }).map((_, i) =>
    createField(`Who We Help Bullet ${i + 1}`, `who_we_help_bullet_${i + 1}`, "text", "50")
  ),

  createTab("Why Choose Us"),
  createField("Why Choose Us Title", "why_choose_us_title", "text"),
  createField("Why Choose Us Description", "why_choose_us_desc", "textarea"),

  createTab("Global Synergy"),
  createField("Global Synergy Title", "global_synergy_title", "text"),
  createField("Global Synergy Description", "global_synergy_desc", "textarea"),
  createField("Synergy Stat 1 Label", "synergy_stat_1_label", "text", "50"),
  createField("Synergy Stat 2 Label", "synergy_stat_2_label", "text", "50"),

  createTab("Global Footprint"),
  createField("Global Footprint Title", "global_footprint_title", "text"),
  createField("Global Footprint Description", "global_footprint_desc", "textarea"),
  ...Array.from({ length: 2 }).flatMap((_, i) => [
    createField(`Global Stat ${i + 1} Value`, `global_stat_${i + 1}_value`, "text", "50"),
    createField(`Global Stat ${i + 1} Label`, `global_stat_${i + 1}_label`, "text", "50")
  ]),
  ...Array.from({ length: 5 }).flatMap((_, i) => [
    createField(`Location ${i + 1} Name`, `location_${i + 1}_name`, "text", "50"),
    createField(`Location ${i + 1} Type`, `location_${i + 1}_type`, "text", "50"),
    createField(`Location ${i + 1} City`, `location_${i + 1}_city`, "text"),
    createField(`Location ${i + 1} Details`, `location_${i + 1}_details`, "textarea"),
    createField(`Location ${i + 1} Lat`, `location_${i + 1}_lat`, "text", "50"),
    createField(`Location ${i + 1} Long`, `location_${i + 1}_lng`, "text", "50")
  ]),

  createTab("History Timeline"),
  createField("History Subtitle", "history_subtitle", "text"),
  createField("History Title", "history_title", "text"),
  ...Array.from({ length: 6 }).flatMap((_, i) => [
    createField(`Milestone ${i + 1} Year`, `milestone_${i + 1}_year`, "text"),
    createField(`Milestone ${i + 1} Title`, `milestone_${i + 1}_title`, "text", "50"),
    createField(`Milestone ${i + 1} Description`, `milestone_${i + 1}_desc`, "textarea", "50")
  ]),

  createTab("CTA Section"),
  createField("CTA Background Image", "cta_bg_image", "image"),
  createField("CTA Title", "cta_title", "text"),
  createField("CTA Description", "cta_description", "textarea"),
  createField("CTA Button 1 Text", "cta_button_1_text", "text", "50"),
  createField("CTA Button 1 URL", "cta_button_1_url", "text", "50"),
  createField("CTA Button 2 Text", "cta_button_2_text", "text", "50"),
  createField("CTA Button 2 URL", "cta_button_2_url", "text", "50")
];

const acfGroup = [
  {
    key: 'group_about_page_fields',
    title: 'About Page Fields',
    fields,
    location: [
      [
        { param: 'page_title', operator: '==', value: 'About' },
      ],
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'All editable fields for the About page (ACF Free compatible).',
    show_in_graphql: 1,
    graphql_field_name: 'aboutPageFields',
  },
];

fs.writeFileSync('scripts/acf-about-import.json', JSON.stringify(acfGroup, null, 4));
console.log(`✓ scripts/acf-about-import.json created with ${fields.length} fields.`);
