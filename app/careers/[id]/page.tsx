import JobDetailsClient from "./JobDetailsClient";

const JOBS = [
  {
    id: "full-stack-dev",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    tags: ["React", "Node.js", "TypeScript"],
    desc: "We are seeking a high-caliber Senior Full Stack Developer to lead the architecture and development of our next-generation enterprise platforms. You will work in an agile environment, collaborating with cross-functional teams to deliver scalable, performant, and secure solutions.",
    requirements: [
      "8+ years of experience in full-stack development with a focus on React and Node.js.",
      "Expertise in TypeScript and modern architectural patterns (Microservices, Event-driven).",
      "Strong understanding of AWS/Azure cloud infrastructure and CI/CD pipelines.",
      "Proven track record of mentoring junior engineers and leading complex technical projects.",
      "Bachelor's or Master's degree in Computer Science or a related field.",
    ],
    benefits: [
      "Competitive salary and equity options.",
      "Comprehensive global health insurance.",
      "Annual learning and development budget of $5,000.",
      "Flexible working arrangements (Remote/Hybrid).",
      "Regular team retreats and innovation hackathons.",
    ],
  },
  {
    id: "ai-solutions-architect",
    title: "AI/ML Solutions Architect",
    department: "Digital Innovation",
    location: "San Francisco, CA",
    type: "Remote",
    tags: ["Python", "PyTorch", "OpenAI"],
    desc: "Join our Digital Innovation Hub to architect AI-driven solutions that solve complex business challenges for global Fortune 500 clients. You will be at the forefront of the generative AI revolution, designing systems that are robust, ethical, and scalable.",
    requirements: [
      "Deep expertise in Python, PyTorch/TensorFlow, and Large Language Models (LLMs).",
      "Experience designing and deploying ML models in production environments.",
      "Strong grasp of data engineering principles and vector databases.",
      "Ability to translate complex business requirements into technical AI architectures.",
      "A passion for staying ahead of the curve in the rapidly evolving AI landscape.",
    ],
    benefits: [
      "Access to state-of-the-art AI research and compute resources.",
      "Opportunity to work on high-impact projects with global visibility.",
      "Generous performance bonuses and innovation incentives.",
      "Unlimited PTO and wellness programs.",
      "Relocation assistance for key tech hubs if preferred.",
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps & SRE Engineer",
    department: "Infrastructure",
    location: "London, UK",
    type: "Hybrid",
    tags: ["AWS", "Kubernetes", "Terraform"],
    desc: "We are looking for a Site Reliability Engineer who is passionate about automation, scalability, and system resilience. You will be responsible for building and maintaining the infrastructure that powers our global operations, ensuring 99.99% uptime and seamless deployments.",
    requirements: [
      "5+ years of experience in DevOps or Site Reliability Engineering.",
      "Mastery of Kubernetes, Docker, and Infrastructure as Code (Terraform/CloudFormation).",
      "Strong scripting skills in Go, Python, or Bash.",
      "Experience with monitoring and observability stacks (Prometheus, Grafana, ELK).",
      "Knowledge of security best practices and compliance frameworks (SOC2, ISO27001).",
    ],
    benefits: [
      "High-performance workstation and home office setup allowance.",
      "Opportunity to work with the latest cloud-native technologies.",
      "Structured career progression and leadership training.",
      "Global mobility options across Hutech's international offices.",
      "Subsidized gym memberships and mental health support.",
    ],
  },
  {
    id: "product-designer",
    title: "UI/UX Product Designer",
    department: "Design Hub",
    location: "Berlin, Germany",
    type: "Full-time",
    tags: ["Figma", "Design Systems", "Prototyping"],
    desc: "As a Product Designer at Hutech, you will shape the user experience of enterprise applications used by millions. You'll work closely with product managers and engineers to create intuitive, accessible, and visually stunning interfaces that solve real user problems.",
    requirements: [
      "Portfolio demonstrating exceptional UI/UX skills for complex SaaS or enterprise tools.",
      "Proficiency in Figma, FigJam, and advanced prototyping tools (Protopie/Framer).",
      "Deep understanding of design systems and how to scale them globally.",
      "Ability to conduct user research and translate insights into design solutions.",
      "Strong communication skills to articulate design decisions to stakeholders.",
    ],
    benefits: [
      "Work in a design-led culture with direct impact on product vision.",
      "Access to the latest design tools and resources.",
      "Collaborative environment with world-class designers and engineers.",
      "Personalized growth plan and mentorship.",
      "Health and wellness allowance.",
    ],
  },
  {
    id: "biz-dev-mgr",
    title: "Business Development Manager",
    department: "Sales & Strategy",
    location: "Singapore",
    type: "Full-time",
    tags: ["Enterprise Sales", "Strategic Partnerships"],
    desc: "Drive the growth of Hutech Solutions in the APAC region. We're looking for a strategic thinker and relationship builder who can identify new opportunities, forge long-term partnerships, and help our clients navigate their digital transformation journeys.",
    requirements: [
      "Proven track record in enterprise software or technology consulting sales.",
      "Strong network within the APAC business community, particularly in BFSI or Logistics.",
      "Ability to understand and articulate complex technical value propositions.",
      "Experience in managing long and complex sales cycles at the C-suite level.",
      "Exceptional negotiation and presentation skills.",
    ],
    benefits: [
      "Highly competitive commission structure with uncapped earning potential.",
      "Opportunity to build and lead the regional sales team.",
      "Strategic involvement in Hutech's global expansion plans.",
      "Premium travel allowances and client engagement budget.",
      "Comprehensive executive health and insurance benefits.",
    ],
  },
];

export async function generateStaticParams() {
  return JOBS.map((job) => ({
    id: job.id,
  }));
}

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const job = JOBS.find((j) => j.id === resolvedParams.id);

  return <JobDetailsClient job={job} />;
}
