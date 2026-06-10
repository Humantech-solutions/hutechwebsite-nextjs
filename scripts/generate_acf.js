const fs = require('fs');

function generateKey(prefix) {
  return `field_home_${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

function createField(label, name, type, additional = {}) {
  return {
    key: generateKey(name),
    label,
    name,
    type,
    instructions: "",
    required: 0,
    conditional_logic: 0,
    wrapper: { width: "", class: "", id: "" },
    default_value: "",
    show_in_graphql: 1,
    graphql_description: "",
    graphql_field_name: name,
    ...additional
  };
}

function createGroup(label, name, sub_fields) {
    return {
        ...createField(label, name, "group"),
        layout: "block",
        sub_fields
    };
}

function createTab(label, name) {
    return {
        key: generateKey(name),
        label: label,
        name: "",
        type: "tab",
        instructions: "",
        required: 0,
        conditional_logic: 0,
        wrapper: {
            width: "",
            class: "",
            id: ""
        },
        placement: "top",
        endpoint: 0
    };
}

// Helper to create fixed number of items instead of ACF Repeater (for free version)
function createFixedRepeaterItems(itemName, count, subFieldsGenerator) {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push(
      createGroup(`${itemName} ${i}`, `${itemName.toLowerCase().replace(/ /g, '_')}_${i}`, subFieldsGenerator(i))
    );
  }
  return items;
}

const fields = [
  createTab("Hero Section", "tab_hero"),
  createGroup("Hero Slides", "heroSlides", [
    ...createFixedRepeaterItems("Slide", 5, (i) => [
      createField("Small Text (Eyebrow)", "eyebrow", "text"),
      createField("Main Title", "title", "textarea", { instructions: "Use | for line break + orange, ^ for orange, ~ for secondary color." }),
      createField("Description", "description", "textarea"),
      createField("Button 1 Text", "btn1Text", "text"),
      createField("Button 1 Link", "btn1Link", "url"),
      createField("Button 2 Text", "btn2Text", "text"),
      createField("Button 2 Link", "btn2Link", "url"),
      createField("Image", "image", "image", { return_format: "url" }),
      createField("Alt Text", "alt", "text")
    ])
  ]),

  createTab("With Hutech", "tab_with_hutech"),
  createGroup("With Hutech Solutions", "withHutech", [
    createField("Title", "title", "text", { default_value: "with Hutech Solutions" }),
    createField("Description", "description", "textarea"),
    createField("Know More Link", "knowMoreLink", "link"),
    createField("Brand Story Link", "brandStoryLink", "link"),
    createField("Image", "image", "image", { return_format: "url" })
  ]),

  createTab("Big Thinkers", "tab_big_thinkers"),
  createGroup("The Big Thinkers", "bigThinkers", [
    createField("Title", "title", "text", { default_value: "^The^ Big ~Thinkers~", instructions: "Use ^ for primary color (blue) and ~ for secondary color (light blue)" }),
    createField("Quote", "quote", "textarea"),
    createField("Author Name", "authorName", "text"),
    createField("Author Title", "authorTitle", "text"),
    createField("Image", "image", "image", { return_format: "url" })
  ]),

  createTab("Expertise", "tab_expertise"),
  createGroup("Expertise Across Industries", "expertise", [
    createField("Title", "title", "text"),
    createField("Description", "description", "textarea"),
    ...createFixedRepeaterItems("Industry", 10, (i) => [
      createField("Name", "name", "text"),
      createField("Icon", "icon", "image", { return_format: "url" }),
      createField("Button Text", "btnText", "text"),
      createField("Button Link", "btnLink", "text")
    ])
  ]),

  createTab("Capabilities", "tab_capabilities"),
  createGroup("Capabilities", "capabilities", [
    createField("Title", "title", "text"),
    createField("Description", "description", "textarea"),
    ...createFixedRepeaterItems("Capability", 8, (i) => [
      createField("Name", "name", "text"),
      createField("Image", "image", "image", { return_format: "url" }),
      createField("Color", "color", "color_picker")
    ])
  ]),

  createTab("Awards", "tab_awards"),
  createGroup("Recognized for Excellence", "awards", [
    createField("Title", "title", "text"),
    createField("Description", "description", "textarea"),
    createField("View All Awards Link", "viewAllAwardsLink", "link"),
    ...createFixedRepeaterItems("Award", 6, (i) => [
      createField("Label", "label", "text"),
      createField("Icon", "icon", "image", { return_format: "url" })
    ])
  ]),

  createTab("Partners", "tab_partners"),
  createGroup("Our Valued Partners", "partners", [
    createField("Title", "title", "text"),
    createField("Description", "description", "textarea"),
    ...createFixedRepeaterItems("Valued Partner", 12, (i) => [
      createField("Name", "name", "text"),
      createField("Logo", "logo", "image", { return_format: "url" })
    ]),
    ...createFixedRepeaterItems("Special Partner", 6, (i) => [
      createField("Name", "name", "text"),
      createField("Logo", "logo", "image", { return_format: "url" })
    ])
  ]),

  createTab("Success Stories", "tab_success_stories"),
  createGroup("Success Stories", "successStories", [
    createField("Title", "title", "text"),
    createField("Description", "description", "textarea"),
    ...createFixedRepeaterItems("Story", 8, (i) => [
      createField("Name", "name", "text"),
      createField("Title", "title", "text"),
      createField("Text", "text", "textarea"),
      createField("Image", "image", "image", { return_format: "url" })
    ])
  ]),

  createTab("Tech Stack", "tab_tech_stack"),
  createGroup("Tech Stack", "techStack", [
    createField("Title", "title", "text", { default_value: "The ^Stack^ Behind\\nEvery Build", instructions: "Use ^ for primary color (orange) and ~ for secondary color (blue)" }),
    createField("Description", "description", "textarea"),
    ...createFixedRepeaterItems("Category", 5, (i) => [
      createField("Category Name", "categoryName", "text"),
      ...createFixedRepeaterItems("Technology", 8, (j) => [
        createField("Name", "name", "text"),
        createField("Icon URL or SVG", "icon", "textarea")
      ])
    ])
  ]),

  createTab("Whats New", "tab_whats_new"),
  createGroup("Whats New", "whatsNew", [
    createField("Title", "title", "text"),
    createField("Description", "description", "textarea"),
    ...createFixedRepeaterItems("News Item", 6, (i) => [
      createField("Title", "title", "text"),
      createField("Date", "date", "text"),
      createField("Image", "image", "image", { return_format: "url" })
    ])
  ]),



  createTab("Why Hutech", "tab_why_hutech"),
  createGroup("Why Hutech", "whyHutech", [
    createField("Title", "title", "text"),
    createField("Background Image", "bgImage", "image", { return_format: "url" }),
    createField("Paragraph 1", "paragraph1", "textarea"),
    createField("Paragraph 2", "paragraph2", "textarea"),
    createField("Paragraph 3", "paragraph3", "textarea"),
    ...createFixedRepeaterItems("Accordion Item", 6, (i) => [
      createField("Title", "title", "text"),
      createField("Content", "content", "textarea")
    ])
  ])
];

const acfGroup = [
  {
    key: "group_hutech_homepage_fields",
    title: "Homepage Settings",
    fields: fields,
    location: [
      [
        {
          param: "page_type",
          operator: "==",
          value: "front_page"
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
    show_in_graphql: 1,
    graphql_field_name: "homepageFields"
  }
];

fs.writeFileSync('acf-homepage-import.json', JSON.stringify(acfGroup, null, 4));
console.log('acf-homepage-import.json created without repeaters!');
