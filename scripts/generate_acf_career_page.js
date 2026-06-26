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
  return createField(label, `tab_${label.toLowerCase().replace(/[^a-z0-9]/g, '_')}`, "tab");
}

const fields = [
  // 1. Hero Section
  createTab("Hero Section"),
  createField("Hero Tagline", "career_page_hero_tagline", "text", "", { default_value: "Join our Talent Ecosystem" }),
  createField("Hero Title", "career_page_hero_title", "text", "", { default_value: "Build your ^Legacy. with us." }),
  createField("Hero Description", "career_page_hero_desc", "textarea", "", { default_value: "Recruiting pioneers to solve complex engineering puzzles and architect the future." }),

  // 2. Openings Section
  createTab("Openings Section"),
  createField("Openings Tagline", "career_openings_tagline", "text", "", { default_value: "Open Opportunities" }),
  createField("Openings Title", "career_openings_title", "text", "", { default_value: "Join the \n Excellence Hub." }),
  createField("Openings No Jobs Title", "career_openings_no_jobs_title", "text", "", { default_value: "No relevant opening for your skill set?" }),
  createField("Openings No Jobs Desc", "career_openings_no_jobs_desc", "textarea", "", { default_value: "We're always looking for exceptional talent. Drop your resume in our talent pool." }),
  createField("General App Button Text", "career_openings_gen_btn", "text", "", { default_value: "General Application" }),

  // 3. Culture Section
  createTab("Culture Section"),
  createField("Culture Tagline", "career_culture_tagline", "text", "", { default_value: "The Hutech Spirit" }),
  createField("Culture Title", "career_culture_title", "text", "", { default_value: "Innovation is \n our ^North Star." }),
  createField("Culture Description", "career_culture_desc", "textarea", "", { default_value: "We foster a culture of radical transparency and extreme ownership. Here, your ideas aren't just heard—they are engineered into reality. We believe in high-performance agility balanced with empathy." }),
  createField("Culture Image", "career_culture_img", "image", "", { return_format: "url", instructions: "Image for 'Innovation is our North Star' section" }),
  createField("Culture Stat 1 Value", "career_culture_stat1_val", "text", "50", { default_value: "92%" }),
  createField("Culture Stat 1 Label", "career_culture_stat1_label", "text", "50", { default_value: "Engineering Ratio" }),
  createField("Culture Stat 2 Value", "career_culture_stat2_val", "text", "50", { default_value: "15+" }),
  createField("Culture Stat 2 Label", "career_culture_stat2_label", "text", "50", { default_value: "Global Tech Hubs" }),
  createField("Culture Badge Line 1", "career_culture_badge1", "text", "50", { default_value: "Great Place" }),
  createField("Culture Badge Line 2", "career_culture_badge2", "text", "50", { default_value: "To Work Certified" }),

  // 4. Hiring Process
  createTab("Hiring Process Section"),
  createField("Hiring Tagline", "career_hiring_tagline", "text", "", { default_value: "Our Selection DNA" }),
  createField("Hiring Description", "career_hiring_desc", "textarea", "", { default_value: "We look for clarity of thought, passion for problem-solving, and a commitment to excellence." }),
  
  // Step 1
  createField("Step 1 Number", "career_hiring_step1_num", "text", "33", { default_value: "01" }),
  createField("Step 1 Title", "career_hiring_step1_title", "text", "33", { default_value: "Application" }),
  createField("Step 1 Desc", "career_hiring_step1_desc", "textarea", "33", { default_value: "Submit your profile." }),
  // Step 2
  createField("Step 2 Number", "career_hiring_step2_num", "text", "33", { default_value: "02" }),
  createField("Step 2 Title", "career_hiring_step2_title", "text", "33", { default_value: "Screening" }),
  createField("Step 2 Desc", "career_hiring_step2_desc", "textarea", "33", { default_value: "Initial HR screening." }),
  // Step 3
  createField("Step 3 Number", "career_hiring_step3_num", "text", "33", { default_value: "03" }),
  createField("Step 3 Title", "career_hiring_step3_title", "text", "33", { default_value: "Technical" }),
  createField("Step 3 Desc", "career_hiring_step3_desc", "textarea", "33", { default_value: "Technical interview." }),
  // Step 4
  createField("Step 4 Number", "career_hiring_step4_num", "text", "33", { default_value: "04" }),
  createField("Step 4 Title", "career_hiring_step4_title", "text", "33", { default_value: "Culture Fit" }),
  createField("Step 4 Desc", "career_hiring_step4_desc", "textarea", "33", { default_value: "Meeting the team." }),
  // Step 5
  createField("Step 5 Number", "career_hiring_step5_num", "text", "33", { default_value: "05" }),
  createField("Step 5 Title", "career_hiring_step5_title", "text", "33", { default_value: "Offer" }),
  createField("Step 5 Desc", "career_hiring_step5_desc", "textarea", "33", { default_value: "Welcome aboard!" }),

  // 5. Benefits Section
  createTab("Benefits Section"),
  createField("Benefits Tagline", "career_benefits_tagline", "text", "", { default_value: "Perks & Benefits" }),
  createField("Benefits Title", "career_benefits_title", "text", "", { default_value: "Investing \n in your \n ^Success." }),
  createField("Benefits Description", "career_benefits_desc", "textarea", "", { default_value: "We provide the resources, environment, and support you need to do the best work of your life." }),
  createField("Main Benefit Title", "career_benefits_main_title", "text", "", { default_value: "Learning Budget" }),
  createField("Main Benefit Description", "career_benefits_main_desc", "textarea", "", { default_value: "$5,000 annual allowance for certifications, conferences, and courses." }),
  
  createField("Benefit 1 Title", "career_benefit1_title", "text", "50", { default_value: "Premium Health" }),
  createField("Benefit 1 Desc", "career_benefit1_desc", "textarea", "50", { default_value: "Comprehensive insurance." }),
  createField("Benefit 2 Title", "career_benefit2_title", "text", "50", { default_value: "Performance Bonus" }),
  createField("Benefit 2 Desc", "career_benefit2_desc", "textarea", "50", { default_value: "Quarterly rewards." }),
  createField("Benefit 3 Title", "career_benefit3_title", "text", "50", { default_value: "Flexible Work" }),
  createField("Benefit 3 Desc", "career_benefit3_desc", "textarea", "50", { default_value: "Remote & Hybrid support." }),
  createField("Benefit 4 Title", "career_benefit4_title", "text", "50", { default_value: "Time to Recharge" }),
  createField("Benefit 4 Desc", "career_benefit4_desc", "textarea", "50", { default_value: "Generous PTO." }),
  createField("Benefit 5 Title", "career_benefit5_title", "text", "50", { default_value: "Modern Stack" }),
  createField("Benefit 5 Desc", "career_benefit5_desc", "textarea", "50", { default_value: "Access the latest tools." }),
  createField("Benefit 6 Title", "career_benefit6_title", "text", "50", { default_value: "Global Mobility" }),
  createField("Benefit 6 Desc", "career_benefit6_desc", "textarea", "50", { default_value: "Transfer opportunities." }),

  // 6. Internship Section
  createTab("Internship Section"),
  createField("Internship Tagline", "career_internship_tagline", "text", "", { default_value: "Internship Programme" }),
  createField("Internship Title", "career_internship_title", "text", "", { default_value: "Launch Your Career ^at Nabhira" }),
  createField("Internship Description", "career_internship_desc", "textarea", "", { default_value: "The Nabhira Emerging Talent Programme is a structured 12-week immersion into enterprise technology..." }),
  createField("Internship Image", "career_internship_img", "image", "", { return_format: "url" }),
  createField("Badge Line 1", "career_internship_badge1", "text", "50", { default_value: "Applications Open" }),
  createField("Badge Line 2", "career_internship_badge2", "text", "50", { default_value: "2026 Cohort" }),
  createField("Button 1 Text", "career_internship_btn1", "text", "50", { default_value: "Apply Now" }),
  createField("Button 1 Link", "career_internship_btn1_link", "url", "50", { default_value: "#" }),
  createField("Button 2 Text", "career_internship_btn2", "text", "50", { default_value: "Download Brochure" }),
  createField("Button 2 File", "career_internship_btn2_file", "file", "50", { return_format: "url" }),

  createField("Program 1 Title", "career_program1_title", "text", "50", { default_value: "AI & Data Engineering" }),
  createField("Program 1 Duration", "career_program1_duration", "text", "50", { default_value: "12 Weeks" }),
  createField("Program 2 Title", "career_program2_title", "text", "50", { default_value: "Cloud Architecture" }),
  createField("Program 2 Duration", "career_program2_duration", "text", "50", { default_value: "12 Weeks" }),
  createField("Program 3 Title", "career_program3_title", "text", "50", { default_value: "Digital Strategy" }),
  createField("Program 3 Duration", "career_program3_duration", "text", "50", { default_value: "10 Weeks" }),
  createField("Program 4 Title", "career_program4_title", "text", "50", { default_value: "Product & UX Design" }),
  createField("Program 4 Duration", "career_program4_duration", "text", "50", { default_value: "10 Weeks" }),

  // 7. Why Different Section
  createTab("Why Different Section"),
  createField("Why Different Tagline", "career_why_tagline", "text", "", { default_value: "Career Advantage" }),
  createField("Why Different Title", "career_why_title", "text", "", { default_value: "Why Nabhira is ^Different" }),
  
  createField("Point 1 Number", "career_why_point1_num", "text", "50", { default_value: "01" }),
  createField("Point 1 Title", "career_why_point1_title", "text", "50", { default_value: "Global Exposure" }),
  createField("Point 2 Number", "career_why_point2_num", "text", "50", { default_value: "02" }),
  createField("Point 2 Title", "career_why_point2_title", "text", "50", { default_value: "Accelerated Growth" }),
  createField("Point 3 Number", "career_why_point3_num", "text", "50", { default_value: "03" }),
  createField("Point 3 Title", "career_why_point3_title", "text", "50", { default_value: "World-Class Mentorship" }),
  createField("Point 4 Number", "career_why_point4_num", "text", "50", { default_value: "04" }),
  createField("Point 4 Title", "career_why_point4_title", "text", "50", { default_value: "Certified Excellence" }),
  createField("Point 5 Number", "career_why_point5_num", "text", "50", { default_value: "05" }),
  createField("Point 5 Title", "career_why_point5_title", "text", "50", { default_value: "Inclusive Culture" }),
  createField("Point 6 Number", "career_why_point6_num", "text", "50", { default_value: "06" }),
  createField("Point 6 Title", "career_why_point6_title", "text", "50", { default_value: "Innovation Time" }),

  // 8. CTA Section
  createTab("CTA Section"),
  createField("CTA Title", "career_cta_title", "text", "", { default_value: "Your Next Chapter \n starts ^now." }),
  createField("CTA Description", "career_cta_desc", "textarea", "", { default_value: "Join a global team of visionaries, engineers, and creatives working together to build a more agile and innovative future." }),
  createField("CTA Card 1 Title", "career_cta_card1_title", "text", "50", { default_value: "Interview Ready?" }),
  createField("CTA Card 1 Desc", "career_cta_card1_desc", "text", "50", { default_value: "Get tips for success" }),
  createField("CTA Card 2 Title", "career_cta_card2_title", "text", "50", { default_value: "Fast-Track" }),
  createField("CTA Card 2 Desc", "career_cta_card2_desc", "text", "50", { default_value: "Hiring in 14 days" }),
];

const acfGroup = [
  {
    key: "group_career_page_all_fields",
    title: "Career Page Fields",
    fields: fields,
    location: [
      [
        {
          param: "page",
          operator: "==",
          value: "38", // Fallback if using specific page ID
        }
      ],
      [
        {
          param: "post_type",
          operator: "==",
          value: "page",
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

fs.writeFileSync('acf-career-page-import.json', JSON.stringify(acfGroup, null, 2));
console.log('✓ acf-career-page-import.json created with ' + fields.length + ' fields/tabs.');
