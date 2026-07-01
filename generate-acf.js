const fs = require('fs');

const utilInstructions = "Use | for line break + orange, ^ for orange, ~ for secondary color.";

const json = [
    {
        "key": "group_life_at_hutech",
        "title": "Life at Hutech Page Settings",
        "fields": [
            {
                "key": "field_life_tab_hero",
                "label": "Hero Section",
                "name": "",
                "type": "tab",
                "placement": "top"
            },
            {
                "key": "field_life_hero_eyebrow",
                "label": "Small Text (Eyebrow)",
                "name": "hero_eyebrow",
                "type": "text",
                "show_in_graphql": 1
            },
            {
                "key": "field_life_hero_title",
                "label": "Main Title",
                "name": "hero_title",
                "type": "textarea",
                "instructions": utilInstructions,
                "show_in_graphql": 1
            },
            {
                "key": "field_life_hero_description",
                "label": "Description",
                "name": "hero_description",
                "type": "textarea",
                "show_in_graphql": 1
            },
            {
                "key": "field_life_hero_image",
                "label": "Background Image",
                "name": "hero_image",
                "type": "image",
                "return_format": "url",
                "show_in_graphql": 1
            },
            
            // GALLERY SECTION
            {
                "key": "field_life_tab_gallery",
                "label": "Gallery Section",
                "name": "",
                "type": "tab",
                "placement": "top"
            },
            {
                "key": "field_life_gallery_eyebrow",
                "label": "Gallery Eyebrow",
                "name": "gallery_eyebrow",
                "type": "text",
                "show_in_graphql": 1
            },
            {
                "key": "field_life_gallery_title",
                "label": "Gallery Title",
                "name": "gallery_title",
                "type": "textarea",
                "instructions": utilInstructions,
                "show_in_graphql": 1
            },
            {
                "key": "field_life_gallery_description",
                "label": "Gallery Description",
                "name": "gallery_description",
                "type": "textarea",
                "show_in_graphql": 1
            },
            {
                "key": "field_life_gallery_categories",
                "label": "Select Categories",
                "name": "gallery_categories",
                "type": "taxonomy",
                "taxonomy": "life_gallery_category",
                "field_type": "multi_select",
                "return_format": "object",
                "show_in_graphql": 1
            },
            {
                "key": "field_life_gallery_tags",
                "label": "Select Tags",
                "name": "gallery_tags",
                "type": "taxonomy",
                "taxonomy": "life_gallery_tag",
                "field_type": "multi_select",
                "return_format": "object",
                "show_in_graphql": 1
            },

            // BENEFITS SECTION
            {
                "key": "field_life_tab_benefits",
                "label": "Benefits Section",
                "name": "",
                "type": "tab",
                "placement": "top"
            },
            {
                "key": "field_life_benefits_eyebrow",
                "label": "Benefits Eyebrow",
                "name": "benefits_eyebrow",
                "type": "text",
                "show_in_graphql": 1
            },
            {
                "key": "field_life_benefits_title",
                "label": "Benefits Title",
                "name": "benefits_title",
                "type": "textarea",
                "instructions": utilInstructions,
                "show_in_graphql": 1
            }
        ],
        "location": [
            [
                {
                    "param": "page_template",
                    "operator": "==",
                    "value": "default"
                }
            ]
        ],
        "show_in_graphql": 1,
        "graphql_field_name": "lifeAtHutechSettings"
    }
];

// Add Benefits (4 fixed groups instead of repeater)
const benefitsGroup = json[0].fields;
for(let i=1; i<=4; i++) {
    benefitsGroup.push({
        "key": `field_life_benefit_${i}`,
        "label": `Benefit ${i}`,
        "name": `benefit_${i}`,
        "type": "group",
        "show_in_graphql": 1,
        "sub_fields": [
            {
                "key": `field_life_benefit_${i}_icon`,
                "label": "Icon (SVG/Text)",
                "name": "icon",
                "type": "text",
                "show_in_graphql": 1
            },
            {
                "key": `field_life_benefit_${i}_title`,
                "label": "Title",
                "name": "title",
                "type": "text",
                "show_in_graphql": 1
            },
            {
                "key": `field_life_benefit_${i}_desc`,
                "label": "Description",
                "name": "description",
                "type": "textarea",
                "show_in_graphql": 1
            }
        ]
    });
}

// Add Workplace Section
benefitsGroup.push(
    {
        "key": "field_life_tab_workplace",
        "label": "Workplace Section",
        "name": "",
        "type": "tab",
        "placement": "top"
    },
    {
        "key": "field_life_workplace_eyebrow",
        "label": "Workplace Eyebrow",
        "name": "workplace_eyebrow",
        "type": "text",
        "show_in_graphql": 1
    },
    {
        "key": "field_life_workplace_title",
        "label": "Workplace Title",
        "name": "workplace_title",
        "type": "textarea",
        "instructions": utilInstructions,
        "show_in_graphql": 1
    },
    {
        "key": "field_life_workplace_categories",
        "label": "Select Categories",
        "name": "workplace_categories",
        "type": "taxonomy",
        "taxonomy": "life_gallery_category",
        "field_type": "multi_select",
        "return_format": "object",
        "show_in_graphql": 1
    },
    {
        "key": "field_life_workplace_tags",
        "label": "Select Tags",
        "name": "workplace_tags",
        "type": "taxonomy",
        "taxonomy": "life_gallery_tag",
        "field_type": "multi_select",
        "return_format": "object",
        "show_in_graphql": 1
    }
);

// Add Workplace Slides removed as requested
// Add CTA Section
benefitsGroup.push(
    {
        "key": "field_life_tab_cta",
        "label": "CTA Section",
        "name": "",
        "type": "tab",
        "placement": "top"
    },
    {
        "key": "field_life_cta_title",
        "label": "CTA Title",
        "name": "cta_title",
        "type": "textarea",
        "instructions": utilInstructions,
        "show_in_graphql": 1
    },
    {
        "key": "field_life_cta_btn1_text",
        "label": "Button 1 Text",
        "name": "cta_btn1_text",
        "type": "text",
        "show_in_graphql": 1
    },
    {
        "key": "field_life_cta_btn1_link",
        "label": "Button 1 Link",
        "name": "cta_btn1_link",
        "type": "url",
        "show_in_graphql": 1
    },
    {
        "key": "field_life_cta_btn2_text",
        "label": "Button 2 Text",
        "name": "cta_btn2_text",
        "type": "text",
        "show_in_graphql": 1
    },
    {
        "key": "field_life_cta_btn2_link",
        "label": "Button 2 Link",
        "name": "cta_btn2_link",
        "type": "url",
        "show_in_graphql": 1
    }
);


// Save the JSON
fs.writeFileSync('life-at-hutech-acf.json', JSON.stringify(json, null, 4));
console.log('Done!');
