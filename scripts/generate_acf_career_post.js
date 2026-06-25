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
  createField("Location", "career_location", "text", "50", {
    instructions: "E.g., Bangalore, India",
    required: 1,
  }),
  createField("Employment Type", "career_type", "text", "50", {
    instructions: "E.g., Full-time, Contract",
    required: 1,
  }),
  createField("Job Description", "career_description", "textarea", "100", {
    instructions: "Main paragraph describing the role.",
    required: 1,
  }),
  createField("What You'll Do", "career_what_youll_do", "textarea", "100", {
    instructions: "Enter each point on a new line.",
  }),
  createField("Requirements", "career_requirements", "textarea", "100", {
    instructions: "Enter each point on a new line.",
  }),
  createField("Superpowers", "career_superpowers", "textarea", "100", {
    instructions: "Enter each point on a new line.",
  }),
  createField("Benefits", "career_benefits", "textarea", "100", {
    instructions: "Enter each point on a new line. Defaults to standard benefits if left blank.",
  }),
];

const acfGroup = [
  {
    key: "group_career_post_fields",
    title: "Career Details",
    fields: fields,
    location: [
      [
        {
          param: "post_type",
          operator: "==",
          value: "hutech_career",
        }
      ]
    ],
    menu_order: 0,
    position: "normal",
    style: "default",
    label_placement: "top",
    instruction_placement: "label",
    hide_on_screen: "",
    active: true,
    description: "",
    show_in_rest: 1,
  }
];

fs.writeFileSync('acf-career-post-import.json', JSON.stringify(acfGroup, null, 2));
console.log('✓ acf-career-post-import.json created with ' + fields.length + ' fields.');
