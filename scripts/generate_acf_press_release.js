const fs = require('fs');

function createField(label, name, type = "text", extra = {}) {
  const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(36);
  return {
    key: `field_press_${name}_${nameHash}`,
    label,
    name,
    type,
    instructions: extra.instructions || "",
    required: 0,
    conditional_logic: 0,
    wrapper: { width: "", class: "", id: "" },
    default_value: extra.default_value || "",
    ...extra
  };
}

// 1. Page Group Config
const pageFields = [
  createField("Hero Tagline", "press_release_hero_tagline", "text", { default_value: "Media Center" }),
  createField("Hero Title", "press_release_hero_title", "text", { default_value: "Press |Releases." }),
  createField("Hero Description", "press_release_hero_description", "textarea", {
    default_value: "Official corporate announcements, strategic partnerships, and executive updates from Hutech Solutions' global leadership."
  }),
  createField("Hero Background Image", "press_release_hero_bg_image", "image", {
    return_format: "array",
    preview_size: "medium",
    library: "all"
  })
];

const pageGroup = [
  {
    key: 'group_press_release_page_fields',
    title: 'Press Release Page Fields',
    fields: pageFields,
    location: [
      [
        { param: 'page_title', operator: '==', value: 'press-release' }
      ],
      [
        { param: 'page_title', operator: '==', value: 'Press Release' }
      ],
      [
        { param: 'page_title', operator: '==', value: 'Press Releases' }
      ],
      [
        { param: 'page_slug', operator: '==', value: 'press-release' }
      ]
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'Editable fields for the Press Release page hero.',
    show_in_graphql: 1,
    graphql_field_name: 'pressReleasePageFields',
  }
];

// 2. Post CPT Group Config
const postFields = [
  createField("Press Release Date", "press_release_date", "date_picker", {
    instructions: "Specific date of the press release (e.g. Nov 05, 2025). Defaults to post publish date if left empty.",
    display_format: "F j, Y",
    return_format: "F j, Y"
  }),
  createField("External URL", "press_release_external_url", "url", {
    instructions: "URL to the external press release page (e.g. https://example.com/pr-article)."
  })
];

const postGroup = [
  {
    key: 'group_press_release_post_fields',
    title: 'Press Release Details',
    fields: postFields,
    location: [
      [
        { param: 'post_type', operator: '==', value: 'hutech_press_release' }
      ]
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'Custom fields for each individual Press Release post.',
    show_in_graphql: 1,
    graphql_field_name: 'pressReleaseFields',
  }
];

fs.writeFileSync('scripts/acf-press-release-page-import.json', JSON.stringify(pageGroup, null, 4));
fs.writeFileSync('scripts/acf-press-release-post-import.json', JSON.stringify(postGroup, null, 4));

console.log('✓ scripts/acf-press-release-page-import.json created.');
console.log('✓ scripts/acf-press-release-post-import.json created.');
