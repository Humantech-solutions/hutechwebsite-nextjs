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

function createTab(label) {
  return {
    key: `field_tab_${label.replace(/\s+/g, "_").toLowerCase()}_${Math.random().toString(36).substr(2, 5)}`,
    label,
    name: "",
    type: "tab",
    instructions: "",
    required: 0,
    conditional_logic: 0,
    wrapper: { width: "", class: "", id: "" },
    placement: "top",
    endpoint: 0
  };
}

function imgField(label, name, extra = {}) {
  return createField(label, name, "image", "", {
    return_format: 'object',
    preview_size: 'medium',
    library: 'all',
    ...extra
  });
}

const fields = [
  // ── Hero Section ──────────────────────────────────────────────────────────
  createTab("Hero Section"),
  createField("Hero Tagline", "contact_hero_tagline", "text", "", { default_value: "Get in Touch" }),
  createField("Hero Title", "contact_hero_title", "text", "", { default_value: "Let's Engineer Your |Next ^Success." }),
  createField("Hero Description", "contact_hero_description", "textarea", "", {
    default_value: "Consultants ready to discuss your next breakthrough project and digital engineering needs."
  }),
  imgField("Hero Background Image", "contact_hero_bg_image"),

  // ── Contact Form ──────────────────────────────────────────────────────────
  createTab("Contact Form"),
  createField("Form Title", "contact_form_title", "text", "", { default_value: "Send a Message" }),
  createField("Form Description", "contact_form_description", "textarea", "", {
    default_value: "Have a specific project in mind? Our consultants are ready to discuss your requirements."
  }),

  // ── Direct Contact ────────────────────────────────────────────────────────
  createTab("Direct Contact"),
  createField("Direct Contact Title", "contact_direct_title", "text", "", { default_value: "Direct Contact" }),
  createField("Email Address", "contact_email", "text", "50", { default_value: "sales@hutechsolutions.com" }),
  createField("Phone Number", "contact_phone", "text", "50", { default_value: "+91 90351 80487" }),

  // ── Social Connect ────────────────────────────────────────────────────────
  createTab("Social Connect"),
  createField("Social Title", "contact_social_title", "text", "", { default_value: "Social Connect" }),
  createField("LinkedIn URL", "contact_social_linkedin", "url", "20", { default_value: "https://www.linkedin.com/company/hutechsolutions/" }),
  createField("Instagram URL", "contact_social_instagram", "url", "20", { default_value: "#" }),
  createField("Facebook URL", "contact_social_facebook", "url", "20", { default_value: "#" }),
  createField("Twitter URL", "contact_social_twitter", "url", "20", { default_value: "#" }),
  createField("YouTube URL", "contact_social_youtube", "url", "20", { default_value: "#" }),

  // ── Customer Support ──────────────────────────────────────────────────────
  createTab("Customer Support"),
  createField("Support Label", "contact_support_label", "text", "", { default_value: "Customer Support" }),
  createField("Support Description", "contact_support_description", "textarea", "", {
    default_value: "Need technical assistance? Our support desk is active 24/7 for managed service clients."
  }),
  createField("Support Button Text", "contact_support_btn_text", "text", "50", { default_value: "Support Portal" }),
  createField("Support Button URL", "contact_support_btn_url", "text", "50", { default_value: "#" }),

  // ── Offices Grid ──────────────────────────────────────────────────────────
  createTab("Offices Grid"),
  createField("Offices Title", "contact_offices_title", "text", "", { default_value: "Our Offices" }),
  createField("Offices Description", "contact_offices_description", "textarea", "", {
    default_value: "Strategically located in the world's leading technology hubs to serve you better."
  }),
  ...Array.from({ length: 6 }).flatMap((_, i) => [
    createField(`Office ${i + 1} City`, `contact_office_${i + 1}_city`, "text", "25", {
      default_value: ["Bangalore", "San Jose", "Ireland", "Singapore"][i] || ""
    }),
    createField(`Office ${i + 1} Country`, `contact_office_${i + 1}_country`, "text", "25", {
      default_value: ["India (HQ)", "United States", "Ireland", "Singapore"][i] || ""
    }),
    createField(`Office ${i + 1} Phone`, `contact_office_${i + 1}_phone`, "text", "25", {
      default_value: ["+91 88674 87771", "+1 408 123 4567", "(+65) 86180073", "(+65) 86180073"][i] || ""
    }),
    createField(`Office ${i + 1} Address`, `contact_office_${i + 1}_address`, "textarea", "100", {
      default_value: [
        "2nd Floor, Humantech Solutions India Pvt. Ltd House, 218, 9th Main Rd, Sector 6, HSR Layout, Bengaluru, Karnataka - 560102",
        "2880 Zanker Road, Suite 203, San Jose, CA 95134",
        "46 Ridgewood Manor, Melitta Road, Kildare, Ireland - R51 H728",
        "105 Cecil Street, The Octagon, Singapore - 069534"
      ][i] || ""
    }),
    imgField(`Office ${i + 1} Image`, `contact_office_${i + 1}_img`, { wrapper: { width: "100" } }),
  ]),

  // ── World Map ─────────────────────────────────────────────────────────────
  createTab("World Map"),
  createField("Map Title", "contact_map_title", "text", "", { default_value: "Worldwide Delivery." }),
  createField("Map Description", "contact_map_description", "textarea", "", {
    default_value: "Supporting clients across 4 continents with our seamless global delivery model and 24/7 engineering capability."
  }),
  imgField("Map Background Image", "contact_map_bg_image"),

  // ── Trust Builders ────────────────────────────────────────────────────────
  createTab("Trust Builders"),
  ...Array.from({ length: 3 }).flatMap((_, i) => [
    createField(`Trust ${i + 1} Title`, `contact_trust_${i + 1}_title`, "text", "50", {
      default_value: ["Response Time", "Global Support", "Enterprise Scale"][i] || ""
    }),
    createField(`Trust ${i + 1} Subtitle`, `contact_trust_${i + 1}_sub`, "text", "50", {
      default_value: ["Under 24 Hours", "24/7 Availability", "Fortune 500 Trusted"][i] || ""
    })
  ]),
];

const acfGroup = [
  {
    key: 'group_contact_page_fields',
    title: 'Contact Page Fields',
    fields,
    location: [
      [
        { param: 'page_title', operator: '==', value: 'Contact Us' },
      ],
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'All editable fields for the Contact Us page (ACF Free compatible).',
    show_in_graphql: 1,
    graphql_field_name: 'contactPageFields',
  },
];

fs.writeFileSync('scripts/acf-contact-import.json', JSON.stringify(acfGroup, null, 4));
console.log(`✓ scripts/acf-contact-import.json created with ${fields.length} fields.`);
