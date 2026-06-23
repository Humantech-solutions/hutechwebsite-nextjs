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

const fields = [
  createField("Document File", "document_file", "file", "100", {
    instructions: "Upload the document (PDF, DOCX, etc.). Date and type will be inferred from this file.",
    return_format: "array",
  }),
  createField("Document External URL", "document_url", "url", "50", {
    instructions: "Optional: If the document is hosted externally, provide the URL here. This overrides the file upload.",
  }),
];

const acfGroup = [
  {
    key: 'group_document_post_fields',
    title: 'Document Post Fields',
    fields,
    location: [
      [
        { param: 'post_type', operator: '==', value: 'hutech_document' },
      ],
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'Fields for individual Hutech Document Posts.',
    show_in_graphql: 1,
    graphql_field_name: 'documentPostFields',
  },
];

fs.writeFileSync('acf-document-post-import.json', JSON.stringify(acfGroup, null, 4));
console.log(`✓ acf-document-post-import.json created with ${fields.length} fields.`);
