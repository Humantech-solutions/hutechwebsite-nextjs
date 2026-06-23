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
  createTab("Hero Section"),
  createField("Hero Tagline", "doc_page_hero_tagline", "text", "", { default_value: "Resource Library" }),
  createField("Hero Title", "doc_page_hero_title", "text", "", { default_value: "Hutech ^Documents." }),
  createField("Hero Description", "doc_page_hero_desc", "textarea", "", { default_value: "Access official publications, corporate reports, and technical whitepapers." }),

  createTab("CTA Section"),
  createField("CTA Title", "doc_page_cta_title", "text", "", { default_value: "Need custom documentation?" }),
  createField("CTA Description", "doc_page_cta_desc", "textarea", "", { default_value: "Our specialized teams can provide tailored technical whitepapers and architecture documentation for your enterprise needs." }),
  createField("CTA Button Text", "doc_page_cta_btn_text", "text", "50", { default_value: "REQUEST ACCESS" }),
  createField("CTA Button URL", "doc_page_cta_btn_url", "text", "50", { default_value: "/contact" }),
];

const acfGroup = [
  {
    key: 'group_document_page_fields',
    title: 'Document Page Fields',
    fields,
    location: [
      [
        { param: 'page_title', operator: '==', value: 'Hutech Documents' },
      ],
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'All editable fields for the Hutech Documents page (ACF Free compatible).',
    show_in_graphql: 1,
    graphql_field_name: 'documentPageFields',
  },
];

fs.writeFileSync('acf-document-page-import.json', JSON.stringify(acfGroup, null, 4));
console.log(`✓ acf-document-page-import.json created with ${fields.length} fields.`);
