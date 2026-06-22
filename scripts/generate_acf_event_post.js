const fs = require('fs');

function createField(label, name, type, extra = {}) {
  return {
    key: `field_event_post_${name}`,
    label: label,
    name: name,
    type: type,
    instructions: extra.instructions || "",
    required: 0,
    conditional_logic: 0,
    wrapper: { width: "", class: "", id: "" },
    default_value: extra.default_value || "",
    ...extra,
  };
}

function createImageField(label, name, extra = {}) {
  return {
    key: `field_event_post_${name}`,
    label: label,
    name: name,
    type: "image",
    instructions: extra.instructions || "",
    required: 0,
    conditional_logic: 0,
    wrapper: { width: "", class: "", id: "" },
    return_format: "object",
    preview_size: "medium",
    library: "all",
    ...extra,
  };
}

const fields = [
  // ─── Basic Info ────────────────────────────────────────────────────────────
  createField("Tagline", "tagline", "text", {
    instructions: "Short tagline shown below the event title in the hero. Use | for line break + accent, ^ for accent, ~ for secondary.",
    default_value: "Unleashing the Potential of Autonomous Intelligence",
  }),
  createField("Event Type", "event_type", "select", {
    instructions: "The display type of the event (shown as a badge).",
    choices: {
      "In-Person": "In-Person",
      "Online": "Online",
      "Hybrid": "Hybrid",
      "Webinar": "Webinar",
    },
    allow_null: 0,
    ui: 1,
    return_format: "value",
    default_value: "In-Person",
  }),
  createField("Event Category / Format", "event_category_label", "select", {
    instructions: "The category badge shown on the event (Summit, Workshop, Symposium, Webinar, etc.).",
    choices: {
      "Summit": "Summit",
      "Workshop": "Workshop",
      "Symposium": "Symposium",
      "Webinar": "Webinar",
      "Conference": "Conference",
      "Hackathon": "Hackathon",
      "Meetup": "Meetup",
      "Panel": "Panel",
    },
    allow_null: 0,
    ui: 1,
    return_format: "value",
    default_value: "Summit",
  }),

  // ─── Date & Time ───────────────────────────────────────────────────────────
  createField("Event Date", "event_date", "date_picker", {
    instructions: "Date of the event. Will display as 'Month DD, YYYY' (e.g. April 20, 2026).",
    display_format: "F j, Y",
    return_format: "F j, Y",
    first_day: 0,
    default_value: "",
  }),
  createField("Event Start Time", "event_time_start", "time_picker", {
    instructions: "Start time. Will display as 'HH:MM AM/PM' (e.g. 09:00 AM).",
    display_format: "h:i A",
    return_format: "h:i A",
    default_value: "",
  }),
  createField("Event End Time", "event_time_end", "time_picker", {
    instructions: "End time. Will display as 'HH:MM AM/PM TZ' (e.g. 05:00 PM GMT). Add timezone manually in the field if needed.",
    display_format: "h:i A",
    return_format: "h:i A",
    default_value: "",
  }),
  createField("Timezone", "timezone", "text", {
    instructions: "Timezone abbreviation (e.g. GMT, EST, CET, IST). Displayed after the time.",
    default_value: "GMT",
  }),

  // ─── Location & Description ────────────────────────────────────────────────
  createField("Location", "location", "text", {
    instructions: "Venue or city (e.g. ExCeL London, UK / Online / New York, Hybrid).",
    default_value: "London, UK",
  }),
  createField("Full Description", "description", "textarea", {
    instructions: "The main 'About the Event' paragraph shown in the event detail page.",
    default_value: "",
  }),

  // ─── Highlights (up to 6) ─────────────────────────────────────────────────
  ...[1, 2, 3, 4, 5, 6].map((i) =>
    createField(`Highlight ${i}`, `highlight_${i}`, "text", {
      instructions: `Key highlight bullet point ${i}. Supports renderTitle syntax (|, ^, ~, quotes).`,
    })
  ),

  // ─── Agenda (up to 8 sessions) ────────────────────────────────────────────
  ...[1, 2, 3, 4, 5, 6, 7, 8].flatMap((i) => [
    createField(`Agenda ${i} Time`, `agenda_${i}_time`, "text", {
      instructions: `Time for agenda session ${i} (e.g. 09:00 AM).`,
      default_value: i === 1 ? "09:00 AM" : "",
    }),
    createField(`Agenda ${i} Title`, `agenda_${i}_title`, "text", {
      instructions: `Title for agenda session ${i}. Supports renderTitle syntax.`,
    }),
  ]),

  // ─── Speakers (up to 5) ───────────────────────────────────────────────────
  ...[1, 2, 3, 4, 5].flatMap((i) => [
    createField(`Speaker ${i} Name`, `speaker_${i}_name`, "text", {
      instructions: `Full name of speaker ${i}.`,
    }),
    createField(`Speaker ${i} Role`, `speaker_${i}_role`, "text", {
      instructions: `Role/title of speaker ${i} (e.g. CTO, Hutech Solutions).`,
    }),
    createImageField(`Speaker ${i} Photo`, `speaker_${i}_image`, {
      instructions: `Portrait photo of speaker ${i}.`,
    }),
  ]),

  // ─── Last Section (CTA / Video) ───────────────────────────────────────────
  createField("CTA Section Title", "cta_title", "text", {
    instructions: "Title for the bottom CTA section. Supports renderTitle syntax (| ^ ~ quotes).",
    default_value: "Missed this |Event?",
  }),
  createField("CTA Section Description", "cta_description", "textarea", {
    instructions: "Description text below the CTA title.",
    default_value:
      "Gain access to exclusive event transcripts, recording links, and early notification of upcoming engineering summits.",
  }),
  createImageField("CTA Section Image", "cta_image", {
    instructions: "Image shown on the right side of the CTA section. If a video URL is set below, a play button will overlay this image.",
  }),
  createField("CTA Video URL", "cta_video_url", "url", {
    instructions: "Optional YouTube or video URL. If provided, a play button will appear over the CTA image and clicking it will open/play the video.",
    default_value: "",
  }),
];

const acfGroup = [
  {
    key: "group_event_post_settings",
    title: "Event Details",
    fields: fields,
    location: [
      [
        {
          param: "post_type",
          operator: "==",
          value: "hutech_event",
        },
      ],
    ],
    menu_order: 1,
    position: "normal",
    style: "default",
    label_placement: "top",
    instruction_placement: "label",
    hide_on_screen: "",
    active: true,
    description: "All fields for the Event detail page.",
    show_in_graphql: 1,
    graphql_field_name: "eventPostFields",
  },
];

fs.writeFileSync('acf-event-post-import.json', JSON.stringify(acfGroup, null, 4));
console.log('acf-event-post-import.json created!');
