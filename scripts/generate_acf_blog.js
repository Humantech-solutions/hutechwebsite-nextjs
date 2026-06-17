const fs = require('fs');

function createField(label, name, type, extra = {}) {
  return {
    key: `field_blog_${name}`,
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
  createField("Blog Page Title", "title", "text", { 
    default_value: "Insights &|Perspectives.", 
    instructions: "Use | for line break + orange color, ^ to toggle orange, ~ for blue. Example: 'Insights &|Perspectives.' renders 'Perspectives.' in orange on a new line." 
  }),
  createField("Blog Page Description", "description", "textarea", {
    default_value: "Stay ahead of the curve with the latest trends, expert analyses, and technological innovations curated by our global team."
  }),
  createField("Background Image", "bg_image", "image", { return_format: "array" })
];

const acfGroup = [
  {
    key: "group_blog_settings",
    title: "Blog Page Settings",
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
    description: "Settings for the Blog landing page. (Only fill these out on the page named 'Blog')",
    show_in_graphql: 1,
    graphql_field_name: "blogFields"
  }
];

fs.writeFileSync('acf-blog-import.json', JSON.stringify(acfGroup, null, 4));
console.log('acf-blog-import.json created!');
