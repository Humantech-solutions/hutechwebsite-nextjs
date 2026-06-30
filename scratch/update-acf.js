const fs = require('fs');
const file = 'acf-homepage-import.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const group = data[0];

// 1. Clean up expertise: keep only title, description, serviceCategorySlug
const expField = group.fields.find(f => f.name === 'expertise');
if (expField && expField.sub_fields) {
  expField.sub_fields = expField.sub_fields.filter(sf => 
    sf.name === 'title' || sf.name === 'description' || sf.name === 'serviceCategorySlug'
  );
  console.log('Cleaned up expertise subfields');
}

// 2. Clean up successStories: keep only title, description
const ssField = group.fields.find(f => f.name === 'successStories');
if (ssField && ssField.sub_fields) {
  ssField.sub_fields = ssField.sub_fields.filter(sf => 
    sf.name === 'title' || sf.name === 'description'
  );
  console.log('Cleaned up successStories subfields');
}

// 3. Clean up whatsNew: keep only title, description, blogCategorySlug, postsCount
const wnField = group.fields.find(f => f.name === 'whatsNew');
if (wnField && wnField.sub_fields) {
  wnField.sub_fields = wnField.sub_fields.filter(sf => 
    sf.name === 'title' || sf.name === 'description' || sf.name === 'blogCategorySlug' || sf.name === 'postsCount'
  );
  console.log('Cleaned up whatsNew subfields');
}

// 4. Flatten techStack group:
// Find index of techStack group and techStack tab
const tabIndex = group.fields.findIndex(f => f.type === 'tab' && f.label === 'Tech Stack');
const groupIndex = group.fields.findIndex(f => f.name === 'techStack');

if (tabIndex !== -1 && groupIndex !== -1) {
  const tsGroup = group.fields[groupIndex];
  
  // Transform sub-fields to be top-level fields
  const flattenedFields = tsGroup.sub_fields.map(sf => {
    const flatField = { ...sf };
    // Prefix name and key to make them top-level unique
    if (flatField.name === 'title') {
      flatField.name = 'techStackTitle';
      flatField.label = 'Tech Stack Title';
      flatField.key = 'field_home_techStackTitle';
      flatField.graphql_field_name = 'techStackTitle';
    } else if (flatField.name === 'description') {
      flatField.name = 'techStackDescription';
      flatField.label = 'Tech Stack Description';
      flatField.key = 'field_home_techStackDescription';
      flatField.graphql_field_name = 'techStackDescription';
    } else {
      // For category_1 to category_5
      flatField.name = 'techStack_' + flatField.name;
      flatField.label = 'Tech Stack ' + flatField.label;
      flatField.key = flatField.key.replace('field_home_', 'field_home_ts_');
      flatField.graphql_field_name = 'techStack_' + flatField.graphql_field_name;
    }
    return flatField;
  });

  // Remove the old group field, and insert flattened fields after the tab field
  group.fields.splice(groupIndex, 1);
  group.fields.splice(tabIndex + 1, 0, ...flattenedFields);
  console.log('Flattened techStack into top-level tab fields');
}

fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf8');

// 5. Generate acf-testimonial-import.json
const testimonialAcf = [
  {
    key: 'group_hutech_testimonial_fields',
    title: 'Testimonial Details',
    fields: [
      {
        key: 'field_testimonial_designation',
        label: 'Designation',
        name: 'designation',
        type: 'text',
        instructions: 'Client designation, e.g., CEO, Founder, Director',
        required: 0,
        conditional_logic: 0,
        wrapper: { width: '', class: '', id: '' },
        default_value: '',
        show_in_graphql: 1,
        graphql_field_name: 'designation'
      },
      {
        key: 'field_testimonial_company',
        label: 'Company',
        name: 'company',
        type: 'text',
        instructions: 'Client company name',
        required: 0,
        conditional_logic: 0,
        wrapper: { width: '', class: '', id: '' },
        default_value: '',
        show_in_graphql: 1,
        graphql_field_name: 'company'
      }
    ],
    location: [
      [
        {
          param: 'post_type',
          operator: '==',
          value: 'hutech_testimonial'
        }
      ]
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'Fields for client testimonials CPT',
    show_in_graphql: 1,
    graphql_field_name: 'testimonialFields'
  }
];

fs.writeFileSync('acf-testimonial-import.json', JSON.stringify(testimonialAcf, null, 4), 'utf8');
console.log('Generated acf-testimonial-import.json');
