import JobDetailsClient from "./JobDetailsClient";

const JOBS = [
  {
    id: "full-stack-dev",
    title: "Shopify Developer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    tags: ["Shopify", "Liquid", "JavaScript"],
    desc: "Are you a code whisperer fluent in multiple languages of the web? Do you dream in microservices and speak REST like your native tongue? We're in search of a Polyglot Full Stack Shopify Developer—a tech sorcerer who seamlessly switches between backend wizardry and frontend finesse—to architect, develop, and deploy highly scalable and resilient web applications.",
    whatYoullDo: [
      "Take the reins of scalable web app design and development, from brainstorming to deployment.",
      "Work cross-functionally with Product, DevOps, and UX teams to build server-side logic, APIs, and delightful user experiences.",
      "Write clean, high-performance code with an obsession for quality, security, and maintainability.",
      "Champion cloud-native architectures and build fault-tolerant systems in AWS.",
      "Lead code reviews, mentor junior developers, and evangelize best practices.",
      "Play a key role in developing the product roadmap, prioritizing features, and delivering on customer promises.",
      "Troubleshoot with flair—turn bugs into features and chaos into clean code.",
    ],
    requirements: [
      "Shopify Liquid, Theme Kit, and Storefront API expert.",
      "Fluent in RESTful APIs and web service integration.",
      "Command over database concepts for Shopify app development.",
      "Frontend flair using React or Vue.js for custom Shopify app interfaces.",
      "Deep-diver into cloud development (e.g., AWS, GCP, Azure) for scalable Shopify apps with CI/CD pipelines.",
      "Solid understanding of headless commerce architecture and Agile SCRUM.",
      "Pro at unit testing and building scalable, secure Shopify applications.",
    ],
    superpowers: [
      "Laser-sharp analytical skills and an instinct to troubleshoot on the fly.",
      "Ability to simplify complexity, translating tech jargon into business gold.",
      "Customer-first mindset with a knack for demos and handling queries.",
      "Collaborative team player with excellent communication skills.",
      "Ready to lead, code, guide, and inspire your squad.",
    ],
    benefits: [
      "Health Insurance",
      "Provident Fund + Performance Bonus",
      "2 Special Leave Days (Just Because!)",
      "Maternity + Paternity Leave",
      "A chance to work on cutting-edge global tech with high-impact delivery",
      "A culture that celebrates code, creativity, and coffee",
    ],
  },
  {
    id: "polyglot-full-stack-java-developer",
    title: "Polyglot Full Stack Java Developer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    tags: ["React", "Node.js", "MongoDB"],
    desc: "Are you a code whisperer fluent in multiple languages of the web? Do you dream in microservices and speak REST like your native tongue? We're in search of a Polyglot Full Stack Java Developer—a tech sorcerer who seamlessly switches between backend wizardry and frontend finesse—to architect, develop, and deploy highly scalable and resilient web applications.",
    whatYoullDo: [
      "Take the reins of scalable web app design and development, from brainstorming to deployment.",
      "Work cross-functionally with Product, DevOps, and UX teams to build server-side logic, APIs, and delightful user experiences.",
      "Write clean, high-performance code with an obsession for quality, security, and maintainability.",
      "Champion cloud-native architectures and build fault-tolerant systems in AWS.",
      "Lead code reviews, mentor junior developers, and evangelize best practices.",
      "Play a key role in developing the product roadmap, prioritizing features, and delivering on customer promises.",
      "Troubleshoot with flair—turn bugs into features and chaos into clean code.",
    ],
    requirements: [
      "Java 8 & Spring Boot microservices whisperer.",
      "Fluent in RESTful APIs and web service integration.",
      "Command over RDBMS like MySQL or PostgreSQL.",
      "Frontend flair using React or Angular (Bonus points for React).",
      "Deep-diver into AWS cloud development with CI/CD pipelines.",
      "Solid understanding of Microservices architecture and Agile SCRUM.",
      "Pro at unit testing and building scalable, secure platforms.",
    ],
    superpowers: [
      "Laser-sharp analytical skills and an instinct to troubleshoot on the fly.",
      "Ability to simplify complexity, translating tech jargon into business gold.",
      "Customer-first mindset with a knack for demos and handling queries.",
      "Collaborative team player with excellent communication skills.",
      "Ready to lead, code, guide, and inspire your squad.",
    ],
    benefits: [
      "Health Insurance",
      "Provident Fund + Performance Bonus",
      "2 Special Leave Days (Just Because!)",
      "Maternity + Paternity Leave",
      "A chance to work on cutting-edge global tech with high-impact delivery",
      "A culture that celebrates code, creativity, and coffee",
    ],
  },
  {
    id: "database-administrator",
    title: "Database Administrator",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
    tags: ["SQL", "Oracle", "MySQL", "MongoDB"],
    desc: "We're looking for a Database Administrator who knows their way around indexes, backups, and performance tuning — and actually enjoys it. If you can keep databases running smoothly while juggling performance, security, and scalability, you'll feel right at home here.",
    whatYoullDo: [
      "Managing and optimizing our SQL/NoSQL databases (MySQL, PostgreSQL, Oracle, MongoDB — the usual suspects).",
      "Keeping an eye on performance and making improvements before anyone even notices there was a dip.",
      "Owning backup, restore, and disaster recovery processes like the responsible grown-up of the data world.",
      "Implementing security best practices to keep our data safe, sound, and stress-free.",
      "Working with engineering and DevOps teams to design scalable and efficient data architectures.",
      "Troubleshooting issues — whether it's a stubborn query or a replication hiccup — with calm confidence.",
      "Automating the repetitive stuff so your day stays interesting.",
    ],
    requirements: [
      "SQL databases: MySQL, PostgreSQL, SQL Server, Oracle",
      "NoSQL tools like MongoDB, Redis",
      "Cloud-managed databases on AWS, Azure, or GCP",
      "Monitoring tools that help keep things smooth (Grafana, Prometheus, CloudWatch, etc.)",
      "Scripting in Shell, Python, or PowerShell",
      "Working with CI/CD pipelines and DevOps workflows",
      "High-availability setups: clustering, replication, failover",
    ],
    superpowers: [
      "You're great at spotting performance issues and even better at fixing them.",
      "You stay calm under pressure and approach tricky database problems with a clear head.",
      "You think proactively — optimizing, securing, and scaling before it becomes a 'must-fix.'",
      "You communicate clearly, whether you're working with engineers or explaining something to non-tech teams.",
      "You take ownership and enjoy seeing systems run beautifully because of your work.",
      "You're curious and always improving your craft, whether it's a new tool, technique, or database engine.",
    ],
    benefits: [
      "Health Insurance",
      "Provident Fund + Performance Bonus",
      "2 Special Leave Days (Just Because!)",
      "Maternity + Paternity Leave",
      "A chance to work on cutting-edge global tech with high-impact delivery",
      "A culture that celebrates code, creativity, and coffee",
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
