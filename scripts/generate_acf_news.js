const fs = require('fs');

function createField(label, name, type = "text", extra = {}) {
  const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(36);
  return {
    key: `field_news_${name}_${nameHash}`,
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

// 1. News Page Group
const pageFields = [
  createField("Hero Tagline", "news_hero_tagline", "text", { default_value: "Corporate Insights" }),
  createField("Hero Title", "news_hero_title", "text", { default_value: "In The |News." }),
  createField("Hero Description", "news_hero_description", "textarea", {
    default_value: "Keeping you updated with our latest milestones, global expansions, and industry-defining engineering breakthroughs."
  }),
  createField("Hero Background Image", "news_hero_bg_image", "image", {
    return_format: "array",
    preview_size: "medium",
    library: "all"
  }),
  createField("CTA Title", "news_cta_title", "text", { default_value: "Media Inquiries" }),
  createField("CTA Description", "news_cta_description", "textarea", {
    default_value: "For press kits, high-resolution imagery, or executive interview requests, please contact our global communications office."
  }),
  createField("CTA Button Text", "news_cta_btn_text", "text", { default_value: "Contact Press Team" }),
  createField("CTA Button URL", "news_cta_btn_url", "text", { default_value: "/contact" })
];

const pageGroup = [
  {
    key: 'group_news_page_fields',
    title: 'News Page Fields',
    fields: pageFields,
    location: [
      [
        { param: 'page_title', operator: '==', value: 'news' }
      ],
      [
        { param: 'page_title', operator: '==', value: 'News' }
      ],
      [
        { param: 'page_title', operator: '==', value: 'In The News' }
      ],
      [
        { param: 'page_slug', operator: '==', value: 'news' }
      ]
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'Editable fields for the News page hero and CTA sections.',
    show_in_graphql: 1,
    graphql_field_name: 'newsPageFields',
  }
];

// 2. News Post Group (Custom Post Type)
const postFields = [
  createField("News Date", "news_date", "date_picker", {
    instructions: "Date of the news article (e.g. Oct 12, 2025). Defaults to post publish date if left empty.",
    display_format: "F j, Y",
    return_format: "F j, Y"
  }),
  createField("Author Name", "news_author", "text", {
    instructions: "Author of the article.",
    default_value: "Elena Vance"
  }),
  createField("Author Role / Title", "news_role", "text", {
    instructions: "Role or title of the author (e.g. Corporate Communications).",
    default_value: "Corporate Communications"
  })
];

const postGroup = [
  {
    key: 'group_news_post_fields',
    title: 'News Details',
    fields: postFields,
    location: [
      [
        { param: 'post_type', operator: '==', value: 'hutech_news' }
      ]
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'Custom fields for each individual News post.',
    show_in_graphql: 1,
    graphql_field_name: 'newsFields',
  }
];

fs.writeFileSync('scripts/acf-news-page-import.json', JSON.stringify(pageGroup, null, 4));
fs.writeFileSync('scripts/acf-news-post-import.json', JSON.stringify(postGroup, null, 4));

console.log('✓ scripts/acf-news-page-import.json created.');
console.log('✓ scripts/acf-news-post-import.json created.');
