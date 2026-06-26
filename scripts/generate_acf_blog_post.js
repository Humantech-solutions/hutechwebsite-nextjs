const fs = require('fs');

function createField(label, name, type, extra = {}) {
  return {
    key: `field_post_${name}`,
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
  createField("FAQ Title", "faq_title", "text", { default_value: "Frequently Asked Questions", instructions: "Use | for line break + orange color, ^ to toggle orange, ~ for blue." }),
  createField("FAQ Subtitle", "faq_subtitle", "textarea", { default_value: "Common questions about implementing AI in enterprise environments, answered by our experts." }),
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
    key: "group_post_settings",
    title: "Post FAQs (ACF Free Version)",
    fields: fields,
    location: [
      [
        {
          param: "post_type",
          operator: "==",
          value: "post"
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
    description: "Add up to 5 FAQs for this blog post.",
    show_in_graphql: 1,
    graphql_field_name: "postFields"
  }
];

fs.writeFileSync('acf-post-import.json', JSON.stringify(acfGroup, null, 4));
console.log('acf-post-import.json created for ACF Free!');
