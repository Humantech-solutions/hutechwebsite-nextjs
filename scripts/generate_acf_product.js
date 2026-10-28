const fs = require('fs');

function createField(label, name, type = "text", width = "", extra = {}) {
  return {
    key: `field_prod_${name}_${Math.random().toString(36).substr(2, 6)}`,
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
    key: `field_tab_prod_${label.replace(/\s+/g, "_").toLowerCase()}_${Math.random().toString(36).substr(2, 6)}`,
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
  // 1. Hero
  createTab("Hero Section"),
  createField("Hero Badge", "hero_badge", "text", "", { default_value: "THE INTELLIGENT WORK PLATFORM" }),
  createField("Hero Title Line 1", "hero_title_line_1", "text", "50", { default_value: "Make complex" }),
  createField("Hero Title Line 2", "hero_title_line_2", "text", "50", { default_value: "work feel" }),
  createField("Hero Title Italic Accent", "hero_title_italic", "text", "50", { default_value: "effortless." }),
  createField("Hero Description", "hero_description", "textarea", "", { default_value: "LumaCore connects your people, data, and workflows in one adaptive platform—so your organization can move with clarity and speed." }),
  createField("Primary CTA Text", "hero_primary_cta_text", "text", "50", { default_value: "Explore LumaCore" }),
  createField("Primary CTA URL", "hero_primary_cta_url", "text", "50", { default_value: "/contact" }),
  createField("Secondary CTA Text", "hero_secondary_cta_text", "text", "50", { default_value: "See how it works" }),
  createField("Rating Score", "hero_rating_score", "text", "50", { default_value: "4.9/5" }),
  createField("Rating Text", "hero_rating_text", "text", "50", { default_value: "from 2,000+ modern teams" }),
  createField("Dashboard Velocity Stat", "dashboard_velocity", "text", "50", { default_value: "94.8%" }),
  createField("Dashboard Velocity Delta", "dashboard_velocity_delta", "text", "50", { default_value: "+12.4%" }),
  createField("Dashboard Active Tasks", "dashboard_active_tasks", "text", "50", { default_value: "1,284" }),
  createField("Dashboard Active Tasks Delta", "dashboard_active_tasks_delta", "text", "50", { default_value: "+8.1%" }),
  createField("Dashboard Time Saved Chip", "dashboard_time_saved", "text", "50", { default_value: "Time saved this week: 128 hours" }),
  createField("Dashboard Task Title", "dashboard_task_title", "text", "50", { default_value: "Automated lead scoring" }),
  createField("Dashboard Task Subtitle", "dashboard_task_subtitle", "text", "50", { default_value: "Qualify inbound leads" }),

  // 2. Product Overview
  createTab("Product Overview"),
  createField("Overview Section Tag", "overview_tag", "text", "50", { default_value: "PRODUCT / 01" }),
  createField("Overview Section Title", "overview_title", "text", "50", { default_value: "PRODUCT OVERVIEW" }),
  createField("Overview Headline Line 1", "overview_headline_1", "text", "50", { default_value: "One platform." }),
  createField("Overview Headline Italic", "overview_headline_italic", "text", "50", { default_value: "Every possibility." }),
  createField("Overview Description", "overview_description", "textarea", "", { default_value: "LumaCore is the intelligent operating layer for modern organizations. It replaces fragmented processes with connected, measurable workflows that keep everyone moving in the same direction." }),
  createField("Overview Stat 1 Value", "overview_stat_1_val", "text", "50", { default_value: "3.2×" }),
  createField("Overview Stat 1 Label", "overview_stat_1_label", "text", "50", { default_value: "FASTER DELIVERY" }),
  createField("Overview Stat 2 Value", "overview_stat_2_val", "text", "50", { default_value: "42%" }),
  createField("Overview Stat 2 Label", "overview_stat_2_label", "text", "50", { default_value: "LESS BUSYWORK" }),

  // 3. Key Features
  createTab("Key Features"),
  createField("Features Section Tag", "features_tag", "text", "50", { default_value: "CAPABILITY / 02" }),
  createField("Features Section Title", "features_title", "text", "50", { default_value: "KEY FEATURES" }),
  createField("Features Headline Prefix", "features_headline_prefix", "text", "50", { default_value: "Built for the way" }),
  createField("Features Headline Italic", "features_headline_italic", "text", "50", { default_value: "great teams work." }),
  createField("Features Description", "features_description", "textarea", "", { default_value: "Powerful enough for your most complex processes. Simple enough for everyone to use." }),
  ...Array.from({ length: 4 }).flatMap((_, i) => [
    createField(`Feature Card ${i + 1} Number`, `feature_${i + 1}_num`, "text", "25", { default_value: `0${i + 1}` }),
    createField(`Feature Card ${i + 1} Title`, `feature_${i + 1}_title`, "text", "25"),
    createField(`Feature Card ${i + 1} Description`, `feature_${i + 1}_desc`, "textarea", "50"),
  ]),

  // 4. Benefits & Business Value
  createTab("Benefits & Value"),
  createField("Benefits Section Tag", "benefits_tag", "text", "50", { default_value: "IMPACT / 03" }),
  createField("Benefits Section Title", "benefits_title", "text", "50", { default_value: "BENEFITS & BUSINESS VALUE" }),
  createField("Benefits Headline Line 1", "benefits_headline_1", "text", "50", { default_value: "Less friction." }),
  createField("Benefits Headline Italic", "benefits_headline_italic", "text", "50", { default_value: "More momentum." }),
  createField("Benefits Description", "benefits_description", "textarea", "", { default_value: "Transform day-to-day work into measurable, compounding business advantage." }),
  createField("Donut Chart Stat", "benefits_donut_stat", "text", "50", { default_value: "67%" }),
  createField("Donut Chart Label", "benefits_donut_label", "text", "50", { default_value: "FEWER DECISIONS" }),
  createField("Bento Card 1 Title", "bento_1_title", "text", "50", { default_value: "Move at market speed" }),
  createField("Bento Card 1 Description", "bento_1_desc", "textarea", "50"),
  createField("Bento Card 2 Title", "bento_2_title", "text", "50", { default_value: "Do more with every hour" }),
  createField("Bento Card 2 Description", "bento_2_desc", "textarea", "50"),
  createField("Bento Card 2 Stat Value", "bento_2_stat", "text", "50", { default_value: "12.5k" }),
  createField("Bento Card 2 Stat Label", "bento_2_stat_label", "text", "50", { default_value: "HOURS RECLAIMED / YR" }),
  createField("Bento Card 3 Title", "bento_3_title", "text", "50", { default_value: "Scale without the drag" }),
  createField("Bento Card 3 Description", "bento_3_desc", "textarea", "50"),

  // 5. How It Works
  createTab("How It Works"),
  createField("Workflow Section Tag", "workflow_tag", "text", "50", { default_value: "WORKFLOW / 04" }),
  createField("Workflow Section Title", "workflow_title", "text", "50", { default_value: "HOW IT WORKS" }),
  createField("Workflow Headline Prefix", "workflow_headline_prefix", "text", "50", { default_value: "From scattered to" }),
  createField("Workflow Headline Italic", "workflow_headline_italic", "text", "50", { default_value: "streamlined." }),
  createField("Workflow Description", "workflow_description", "textarea", "", { default_value: "Connect your systems, design your flow, and let LumaCore keep work moving." }),
  ...Array.from({ length: 3 }).flatMap((_, i) => [
    createField(`Workflow Step ${i + 1} Number`, `step_${i + 1}_num`, "text", "25", { default_value: `0${i + 1}` }),
    createField(`Workflow Step ${i + 1} Title`, `step_${i + 1}_title`, "text", "25"),
    createField(`Workflow Step ${i + 1} Description`, `step_${i + 1}_desc`, "textarea", "50"),
  ]),

  // 6. Use Cases
  createTab("Use Cases"),
  createField("Use Cases Section Tag", "use_cases_tag", "text", "50", { default_value: "SOLUTIONS / 05" }),
  createField("Use Cases Section Title", "use_cases_title", "text", "50", { default_value: "USE CASES" }),
  createField("Use Cases Headline Prefix", "use_cases_headline_prefix", "text", "50", { default_value: "Whatever the work," }),
  createField("Use Cases Headline Italic", "use_cases_headline_italic", "text", "50", { default_value: "make it flow." }),
  ...Array.from({ length: 3 }).flatMap((_, i) => [
    createField(`Use Case ${i + 1} Number`, `usecase_${i + 1}_num`, "text", "25", { default_value: `0${i + 1}` }),
    createField(`Use Case ${i + 1} Title`, `usecase_${i + 1}_title`, "text", "25"),
    createField(`Use Case ${i + 1} Description`, `usecase_${i + 1}_desc`, "textarea", "50"),
    createField(`Use Case ${i + 1} Pills (comma separated)`, `usecase_${i + 1}_pills`, "text", "50"),
  ]),

  // 7. Industries We Serve
  createTab("Industries We Serve"),
  createField("Industries Section Tag", "industries_tag", "text", "50", { default_value: "EXPERTISE / 06" }),
  createField("Industries Section Title", "industries_title", "text", "50", { default_value: "INDUSTRIES WE SERVE" }),
  createField("Industries Headline Prefix", "industries_headline_prefix", "text", "50", { default_value: "Built for your\nreal-world" }),
  createField("Industries Headline Italic", "industries_headline_italic", "text", "50", { default_value: "complexity." }),
  createField("Industries Description", "industries_description", "textarea", "", { default_value: "Flexible foundations, tailored patterns, and controls for the way your industry works." }),
  ...Array.from({ length: 5 }).flatMap((_, i) => [
    createField(`Industry ${i + 1} Number`, `ind_${i + 1}_num`, "text", "25", { default_value: `0${i + 1}` }),
    createField(`Industry ${i + 1} Name`, `ind_${i + 1}_name`, "text", "25"),
    createField(`Industry ${i + 1} Tagline`, `ind_${i + 1}_tagline`, "text", "50"),
  ]),

  // 8. Technical Specifications
  createTab("Technical Specs"),
  createField("Specs Section Tag", "specs_tag", "text", "50", { default_value: "DETAILS / 07" }),
  createField("Specs Section Title", "specs_title", "text", "50", { default_value: "TECHNICAL SPECIFICATIONS" }),
  createField("Specs Headline Prefix", "specs_headline_prefix", "text", "50", { default_value: "Engineered for" }),
  createField("Specs Headline Italic", "specs_headline_italic", "text", "50", { default_value: "enterprise scale." }),
  ...Array.from({ length: 5 }).flatMap((_, i) => [
    createField(`Spec ${i + 1} Number`, `spec_${i + 1}_num`, "text", "20", { default_value: `0${i + 1}` }),
    createField(`Spec ${i + 1} Category`, `spec_${i + 1}_category`, "text", "30"),
    createField(`Spec ${i + 1} Details`, `spec_${i + 1}_details`, "text", "30"),
    createField(`Spec ${i + 1} Metric`, `spec_${i + 1}_metric`, "text", "20"),
  ]),

  // 9. Integrations & Compatibility
  createTab("Integrations"),
  createField("Integrations Section Tag", "integrations_tag", "text", "50", { default_value: "ECOSYSTEM / 08" }),
  createField("Integrations Section Title", "integrations_title", "text", "50", { default_value: "INTEGRATIONS & COMPATIBILITY" }),
  createField("Integrations Headline Prefix", "integrations_headline_prefix", "text", "50", { default_value: "Plays well with" }),
  createField("Integrations Headline Italic", "integrations_headline_italic", "text", "50", { default_value: "everything." }),
  createField("Integrations Description", "integrations_description", "textarea", "", { default_value: "Connect LumaCore to the tools your teams love. Sync data, trigger actions, and build a truly connected stack." }),
  createField("Integrations Button Text", "integrations_button_text", "text", "50", { default_value: "View all integrations →" }),
  createField("Integrations Button URL", "integrations_button_url", "text", "50", { default_value: "/contact" }),

  // 10. Security & Compliance
  createTab("Security & Compliance"),
  createField("Security Section Tag", "security_tag", "text", "50", { default_value: "TRUST / 09" }),
  createField("Security Section Title", "security_title", "text", "50", { default_value: "SECURITY & COMPLIANCE" }),
  createField("Security Headline Prefix", "security_headline_prefix", "text", "50", { default_value: "Your trust is" }),
  createField("Security Headline Italic", "security_headline_italic", "text", "50", { default_value: "our architecture." }),
  createField("Security Description", "security_description", "textarea", "", { default_value: "Security isn't a feature we add. It's the foundation we build on—from infrastructure to every interaction." }),
  ...Array.from({ length: 3 }).flatMap((_, i) => [
    createField(`Security Pillar ${i + 1} Number`, `sec_pillar_${i + 1}_num`, "text", "25", { default_value: `0${i + 1}` }),
    createField(`Security Pillar ${i + 1} Title`, `sec_pillar_${i + 1}_title`, "text", "25"),
    createField(`Security Pillar ${i + 1} Description`, `sec_pillar_${i + 1}_desc`, "textarea", "50"),
  ]),
  createField("Security Badges (comma separated)", "security_badges", "text", "", { default_value: "SOC 2 TYPE II, ISO 27001, GDPR COMPLIANT, HIPAA READY" }),

  // 11. Frequently Asked Questions (FAQs)
  createTab("FAQs"),
  createField("FAQs Section Tag", "faqs_tag", "text", "50", { default_value: "SUPPORT / 10" }),
  createField("FAQs Section Title", "faqs_title", "text", "50", { default_value: "FREQUENTLY ASKED QUESTIONS (FAQS)" }),
  createField("FAQs Headline Prefix", "faqs_headline_prefix", "text", "50", { default_value: "Good questions." }),
  createField("FAQs Headline Italic", "faqs_headline_italic", "text", "50", { default_value: "Clear answers." }),
  createField("FAQs Description", "faqs_description", "textarea", "", { default_value: "Still curious? Our product specialists are here to help." }),
  createField("FAQs Contact Text", "faqs_contact_text", "text", "50", { default_value: "Talk to an expert" }),
  createField("FAQs Contact URL", "faqs_contact_url", "text", "50", { default_value: "/contact" }),
  ...Array.from({ length: 4 }).flatMap((_, i) => [
    createField(`FAQ ${i + 1} Number`, `faq_${i + 1}_num`, "text", "25", { default_value: `0${i + 1}` }),
    createField(`FAQ ${i + 1} Question`, `faq_${i + 1}_question`, "text", "75"),
    createField(`FAQ ${i + 1} Answer`, `faq_${i + 1}_answer`, "textarea", ""),
  ]),

  // 12. Final CTA
  createTab("CTA Banner"),
  createField("CTA Tag", "cta_tag", "text", "", { default_value: "READY WHEN YOU ARE" }),
  createField("CTA Line 1", "cta_line_1", "text", "50", { default_value: "Turn your best ideas" }),
  createField("CTA Line 2", "cta_line_2", "text", "50", { default_value: "into" }),
  createField("CTA Italic Accent", "cta_italic", "text", "50", { default_value: "real momentum." }),
  createField("CTA Description", "cta_description", "textarea", "", { default_value: "See how LumaCore can transform the way your organization works." }),
  createField("CTA Button Text", "cta_button_text", "text", "50", { default_value: "Book your personalized demo" }),
  createField("CTA Button URL", "cta_button_url", "text", "50", { default_value: "/contact" })
];

const acfGroup = [
  {
    key: 'group_product_page_fields',
    title: 'Product Page Fields (Modern PDP)',
    fields,
    location: [
      [
        { param: 'post_type', operator: '==', value: 'product' },
      ],
      [
        { param: 'page_template', operator: '==', value: 'template-product.php' },
      ]
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'All editable fields for the Modern Product Description Page template (compatible with ACF Free and Pro).',
    show_in_graphql: 1,
    graphql_field_name: 'productPageFields',
  },
];

// Ensure acf-exports exists
if (!fs.existsSync('acf-exports')) {
  fs.mkdirSync('acf-exports');
}

fs.writeFileSync('acf-exports/acf_product_page.json', JSON.stringify(acfGroup, null, 4));
console.log(`✓ acf-exports/acf_product_page.json created with ${fields.length} fields across all 10 required product sections.`);
