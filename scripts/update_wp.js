const fs = require('fs');

let content = fs.readFileSync('lib/wordpress.ts', 'utf8');

// Replace the CASE_STUDY_FAQ_QUERY
const newQuery = `const CASE_STUDY_FAQ_QUERY = \`
  query GetCaseStudyFaq($slug: ID!) {
    caseStudy(id: $slug, idType: SLUG) {
      caseStudyPostFields {
        client
        impact
        shortDesc
        clientDomain
        platform
        geography
        overviewQuote
        overviewText1
        overviewText2
        challenge1Title
        challenge1Desc
        challenge1Icon
        challenge2Title
        challenge2Desc
        challenge2Icon
        challenge3Title
        challenge3Desc
        challenge3Icon
        solution1Title
        solution1Desc
        solution1Icon
        solution2Title
        solution2Desc
        solution2Icon
        solution3Title
        solution3Desc
        solution3Icon
        solution4Title
        solution4Desc
        solution4Icon
        process1Number
        process1Title
        process1Desc
        process2Number
        process2Title
        process2Desc
        process3Number
        process3Title
        process3Desc
        process4Number
        process4Title
        process4Desc
        process5Number
        process5Title
        process5Desc
        result1Title
        result1Desc
        result2Title
        result2Desc
        result3Title
        result3Desc
        result4Title
        result4Desc
        faqTitle
        faqSubtitle
        faq1Question
        faq1Answer
        faq2Question
        faq2Answer
        faq3Question
        faq3Answer
        faq4Question
        faq4Answer
        faq5Question
        faq5Answer
      }
    }
  }
\`;`;

content = content.replace(/const CASE_STUDY_FAQ_QUERY = `[\s\S]*?`;/, newQuery);

// Add CaseStudy import at the top
if (!content.includes('import { CaseStudy } from "@/lib/data/case-studies";')) {
  content = `import { CaseStudy } from "@/lib/data/case-studies";\n` + content;
}

// Replace transformCaseStudyNode
const newTransform = `function transformCaseStudyNode(node: any): CaseStudy {
  const pf = node.caseStudyPostFields || {};
  
  const category = node.categories?.nodes?.[0]?.name ?? "Case Study";
  const tags = node.tags?.nodes?.map((t: any) => t.name) ?? [];
  const imageUrl = node.featuredImage?.node?.sourceUrl ?? "";

  const overviewText = [];
  if (pf.overviewText1) overviewText.push(pf.overviewText1);
  if (pf.overviewText2) overviewText.push(pf.overviewText2);

  const challenges = [];
  for (let i = 1; i <= 3; i++) {
    if (pf[\`challenge\${i}Title\`]) {
      challenges.push({
        title: pf[\`challenge\${i}Title\`],
        desc: pf[\`challenge\${i}Desc\`] || "",
        icon: pf[\`challenge\${i}Icon\`] || "Target",
      });
    }
  }

  const solutions = [];
  for (let i = 1; i <= 4; i++) {
    if (pf[\`solution\${i}Title\`]) {
      solutions.push({
        title: pf[\`solution\${i}Title\`],
        desc: pf[\`solution\${i}Desc\`] || "",
        icon: pf[\`solution\${i}Icon\`] || "Zap",
      });
    }
  }

  const process = [];
  for (let i = 1; i <= 5; i++) {
    if (pf[\`process\${i}Title\`]) {
      process.push({
        number: pf[\`process\${i}Number\`] || \`0\${i}\`,
        title: pf[\`process\${i}Title\`],
        desc: pf[\`process\${i}Desc\`] || "",
      });
    }
  }

  const results = [];
  for (let i = 1; i <= 4; i++) {
    if (pf[\`result\${i}Title\`]) {
      results.push({
        title: pf[\`result\${i}Title\`],
        desc: pf[\`result\${i}Desc\`] || "",
      });
    }
  }

  const faqs = [];
  for (let i = 1; i <= 5; i++) {
    if (pf[\`faq\${i}Question\`] && pf[\`faq\${i}Answer\`]) {
      faqs.push({
        question: pf[\`faq\${i}Question\`],
        answer: pf[\`faq\${i}Answer\`],
      });
    }
  }

  return {
    slug: node.slug,
    title: node.title ?? "",
    client: pf.client ?? "Client Name",
    impact: pf.impact ?? "",
    image: imageUrl,
    heroImage: imageUrl,
    tags,
    category,
    shortDesc: pf.shortDesc ?? "",
    clientDomain: pf.clientDomain ?? "",
    platform: pf.platform ?? "",
    geography: pf.geography ?? "",
    overviewQuote: pf.overviewQuote ?? "",
    overviewText,
    challenges,
    solutions,
    process,
    results,
    faqs,
    faqTitle: pf.faqTitle,
    faqSubtitle: pf.faqSubtitle,
  } as any;
}`;

content = content.replace(/function transformCaseStudyNode\([\s\S]*?return \{[\s\S]*?\};\n\}/, newTransform);

// Replace return types in getCaseStudies and getCaseStudyBySlug
content = content.replace(/export async function getCaseStudies\(\): Promise<WpBlog\[\]> {/g, 'export async function getCaseStudies(): Promise<CaseStudy[]> {');
content = content.replace(/export async function getCaseStudyBySlug\(slug: string\): Promise<WpBlog \| null> {/g, 'export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {');

fs.writeFileSync('lib/wordpress.ts', content);
console.log('Updated lib/wordpress.ts');
