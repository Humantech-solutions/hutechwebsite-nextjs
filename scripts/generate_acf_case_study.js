const fs = require('fs');

function createField(label, name, type, extra = {}) {
  return {
    key: `field_case_study_${name}`,
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
  createField("Case Studies Page Title", "title", "text", { 
    default_value: "Success |Stories.", 
    instructions: "Use | for line break + orange color, ^ to toggle orange, ~ for blue." 
  }),
  createField("Case Studies Page Description", "description", "textarea", {
    default_value: "Discover how we've helped leading organizations transform their businesses with innovative technology solutions."
  }),
  createField("Background Image", "bg_image", "image", { return_format: "array" })
];

const acfGroup = [
  {
    key: "group_case_studies_settings",
    title: "Case Studies Page Settings",
    fields: fields,
    location: [
      [
        {
          param: "post_type",
          operator: "==",
          value: "page"
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
    description: "Settings for the Case Studies landing page. (Only fill these out on the page named 'Case Studies')",
    show_in_graphql: 1,
    graphql_field_name: "caseStudyPageFields"
  }
];

fs.writeFileSync('acf-case-studies-import.json', JSON.stringify(acfGroup, null, 4));
console.log('acf-case-studies-import.json created!');
