const fs = require('fs');

function createField(label, name, type, extra = {}) {
  return {
    key: `field_case_study_post_${name}`,
    label: label,
    name: name,
    type: type,
    instructions: extra.instructions || "",
    required: 0,
    conditional_logic: 0,
    wrapper: { width: "", class: "", id: "" },
    default_value: extra.default_value || "",
    ...extra
  };
}

const fields = [
  // Basic Details
  createField("Client Name", "client", "text", { default_value: "Global Fashion Brand Storefront on Shopify" }),
  createField("Impact", "impact", "text", { default_value: "Seamless Data Validation & Brand-Consistent Design" }),
  createField("Short Description", "short_desc", "textarea", { default_value: "Establishing international fashion brand presence..." }),

  // List View Overrides
  createField("List Client Name", "list_client", "text", { instructions: "Client name shown only on the main Case Studies list page" }),
  createField("List Description", "list_desc", "textarea", { instructions: "Description shown only on the main Case Studies list page" }),
  
  // Project Info
  createField("Client Domain", "client_domain", "text", { default_value: "Global Fashion Retail" }),
  createField("Platform", "platform", "text", { default_value: "Shopify Plus" }),
  createField("Geography", "geography", "text", { default_value: "Global / Indonesia" }),
  
  // Overview
  createField("Overview Quote", "overview_quote", "textarea", { default_value: "Developing a brand-consistent..." }),
  createField("Overview Text 1", "overview_text_1", "textarea"),
  createField("Overview Text 2", "overview_text_2", "textarea"),

  // Challenges (Up to 3)
  ...[1, 2, 3].flatMap(i => [
    createField(`Challenge ${i} Title`, `challenge_${i}_title`, "text"),
    createField(`Challenge ${i} Description`, `challenge_${i}_desc`, "textarea"),
    createField(`Challenge ${i} Icon (Lucide Name)`, `challenge_${i}_icon`, "text", { default_value: "Target" }),
  ]),

  // Solutions (Up to 4)
  ...[1, 2, 3, 4].flatMap(i => [
    createField(`Solution ${i} Title`, `solution_${i}_title`, "text"),
    createField(`Solution ${i} Description`, `solution_${i}_desc`, "textarea"),
    createField(`Solution ${i} Icon (Lucide Name)`, `solution_${i}_icon`, "text", { default_value: "Zap" }),
  ]),

  // Process (Up to 5)
  ...[1, 2, 3, 4, 5].flatMap(i => [
    createField(`Process ${i} Number`, `process_${i}_number`, "text", { default_value: `0${i}` }),
    createField(`Process ${i} Title`, `process_${i}_title`, "text"),
    createField(`Process ${i} Description`, `process_${i}_desc`, "textarea"),
  ]),

  // Results (Up to 4)
  ...[1, 2, 3, 4].flatMap(i => [
    createField(`Result ${i} Title`, `result_${i}_title`, "text"),
    createField(`Result ${i} Description`, `result_${i}_desc`, "textarea"),
  ]),

  // FAQs
  createField("FAQ Title", "faq_title", "text", { default_value: "Frequently Asked Questions" }),
  createField("FAQ Subtitle", "faq_subtitle", "textarea", { default_value: "Common questions about this case study." }),
  createField("FAQ 1 Question", "faq_1_question", "text"),
  createField("FAQ 1 Answer", "faq_1_answer", "textarea"),
  createField("FAQ 2 Question", "faq_2_question", "text"),
  createField("FAQ 2 Answer", "faq_2_answer", "textarea"),
  createField("FAQ 3 Question", "faq_3_question", "text"),
  createField("FAQ 3 Answer", "faq_3_answer", "textarea"),
  createField("FAQ 4 Question", "faq_4_question", "text"),
  createField("FAQ 4 Answer", "faq_4_answer", "textarea"),
  createField("FAQ 5 Question", "faq_5_question", "text"),
  createField("FAQ 5 Answer", "faq_5_answer", "textarea"),
];

const acfGroup = [
  {
    key: "group_case_study_post_settings",
    title: "Case Study Details (ACF Free Version)",
    fields: fields,
    location: [
      [
        {
          param: "post_type",
          operator: "==",
          value: "case_study"
        }
      ]
    ],
    menu_order: 1,
    position: "normal",
    style: "default",
    label_placement: "top",
    instruction_placement: "label",
    hide_on_screen: "",
    active: true,
    description: "Detailed sections for the Case Study.",
    show_in_graphql: 1,
    graphql_field_name: "caseStudyPostFields"
  }
];

fs.writeFileSync('acf-case-study-post-import.json', JSON.stringify(acfGroup, null, 4));
console.log('acf-case-study-post-import.json created with full details for ACF Free!');
