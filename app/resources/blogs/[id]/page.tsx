import BlogDetailClient from "./BlogDetailClient";

const BLOGS_DATA: Record<string, any> = {
  "1": {
    title: "The Future of AI in Enterprise",
    date: "March 10, 2026",
    author: "Dr. Sarah Chen",
    role: "Chief AI Officer",
    category: "AI",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      {
        type: "paragraph",
        text: "Generative AI is no longer just a buzzword; it's becoming the backbone of modern enterprise operations. From automating routine tasks to providing deep analytical insights, AI is reshaping how businesses function.",
      },
      {
        type: "heading",
        text: "Strategic Implementation",
      },
      {
        type: "paragraph",
        text: "For enterprises looking to stay competitive, the question is no longer 'if' they should adopt AI, but 'how' they should implement it effectively and ethically to drive growth.",
      },
      {
        type: "quote",
        text: "AI will not replace managers, but managers who use AI will replace those who don't.",
        author: "Industry Metric",
      },
    ],
    tags: ["AI", "Enterprise", "Digital Transformation"],
  },
  "2": {
    title: "Securing the Hybrid Cloud",
    date: "March 05, 2026",
    author: "James Wilson",
    role: "SecOps Lead",
    category: "Cybersecurity",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      {
        type: "paragraph",
        text: "As organizations move to hybrid cloud environments, security becomes a more complex challenge. Zero-trust architecture is essential for protecting sensitive data across distributed networks.",
      },
    ],
    tags: ["Cloud", "Security", "Zero Trust"],
  },
  "3": {
    title: "Data-Driven Logistics",
    date: "February 28, 2026",
    author: "Michael Port",
    role: "Logistics Analyst",
    category: "Logistics",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      {
        type: "paragraph",
        text: "Real-time analytics is revolutionizing the logistics industry. By utilizing data-driven insights, companies can optimize their supply chains, reduce costs, and improve overall resilience.",
      },
    ],
    tags: ["Logistics", "Data", "Supply Chain"],
  },
  "4": {
    title: "Cloud Native Transformation",
    date: "February 15, 2026",
    author: "Elena Rodriguez",
    role: "Cloud Architect",
    category: "Cloud",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      {
        type: "paragraph",
        text: "Cloud-native architectures are essential for achieving unparalleled scalability and developer velocity. This transformation involves moving beyond simple virtualization to a more integrated, agile approach.",
      },
    ],
    tags: ["Cloud Native", "Architecture", "Scalability"],
  },
  "5": {
    title: "The Ethics of Autonomous Systems",
    date: "February 10, 2026",
    author: "Dr. Sarah Chen",
    role: "Chief AI Officer",
    category: "Technology",
    readTime: "11 min read",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      {
        type: "paragraph",
        text: "As autonomous systems become more integrated into industrial applications, navigating the complex moral and ethical landscape becomes a critical responsibility for engineers and leaders.",
      },
    ],
    tags: ["Ethics", "AI", "Autonomous Systems"],
  },
  "6": {
    title: "Quantum Computing: A Decadal Outlook",
    date: "January 25, 2026",
    author: "James Wilson",
    role: "Research Head",
    category: "Technology",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    content: [
      {
        type: "paragraph",
        text: "The post-quantum world will bring significant challenges for cryptography and materials science. Preparing for these implications is essential for maintaining a secure and innovative digital landscape.",
      },
    ],
    tags: ["Quantum Computing", "Future Tech", "Cryptography"],
  },
};

export async function generateStaticParams() {
  return Object.keys(BLOGS_DATA).map((id) => ({
    id: id,
  }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const blog = BLOGS_DATA[id] || BLOGS_DATA["1"];

  return <BlogDetailClient blog={blog} />;
}
