import BlogDetailClient from "./BlogDetailClient";
import { BLOG_DATA } from "./BlogClient";

export function generateStaticParams() {
  return [
    { id: "ai-shopping-assistants-transforming-commerce" },
    { id: "blockchain-supply-chain-revolution" },
    { id: "edge-computing-iot-future" },
    { id: "fintech-regulatory-compliance" },
    { id: "healthcare-data-analytics-transformation" },
    { id: "devops-culture-best-practices" },
    { id: "future-of-ai-in-enterprise" },
    { id: "securing-hybrid-cloud" },
    { id: "data-driven-logistics" },
    { id: "quantum-computing-enterprise-reality" },
    { id: "sustainable-green-software-engineering" },
    { id: "5g-connected-enterprise-transformation" }
  ];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = BLOG_DATA[id];
  return <BlogDetailClient blog={blog} />;
}
