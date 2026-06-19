const fs = require('fs');

// ACF fields for the Events list page (page-level settings)
const acfGroup = [
  {
    key: "group_event_page_settings",
    title: "Event Page Settings",
    fields: [
      {
        key: "field_event_page_title",
        label: "Page Title",
        name: "title",
        type: "text",
        instructions: "Main title for the Events listing page. Use | for line break + accent color, ^ for accent color only, ~ for secondary color.",
        required: 0,
        conditional_logic: 0,
        wrapper: { width: "", class: "", id: "" },
        default_value: "Connect & |Collaborate.",
      },
      {
        key: "field_event_page_description",
        label: "Page Description",
        name: "description",
        type: "textarea",
        instructions: "Subtitle/description text shown below the title on the Events listing page.",
        required: 0,
        conditional_logic: 0,
        wrapper: { width: "", class: "", id: "" },
        default_value: "Join us at global conferences, summits, and workshops where we share our expertise and explore the future of engineering.",
      },
      {
        key: "field_event_page_bg_image",
        label: "Background Image",
        name: "bg_image",
        type: "image",
        instructions: "Background image for the Events listing page hero section.",
        required: 0,
        conditional_logic: 0,
        wrapper: { width: "", class: "", id: "" },
        return_format: "object",
        preview_size: "medium",
        library: "all",
      },
    ],
    location: [
      [
        {
          param: "page_template",
          operator: "==",
          value: "default",
        },
        {
          param: "page_title",
          operator: "==",
          value: "Events",
        },
      ],
    ],
    menu_order: 0,
    position: "normal",
    style: "default",
    label_placement: "top",
    instruction_placement: "label",
    hide_on_screen: "",
    active: true,
    description: "Settings for the Events listing page.",
    show_in_graphql: 1,
    graphql_field_name: "eventPageFields",
  },
];

fs.writeFileSync('acf-event-import.json', JSON.stringify(acfGroup, null, 4));
console.log('acf-event-import.json created!');
