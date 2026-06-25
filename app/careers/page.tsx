import CareersClient from "./CareersClient";
import { getCareers, getCareerPageData } from "@/lib/wordpress";

export const revalidate = 60; // ISR

export async function generateMetadata() {
  const pageData = await getCareerPageData();
  return {
    title: "Careers | Hutech Solutions",
    description: pageData?.heroDesc || "Join our talent ecosystem. We're recruiting pioneers to solve complex engineering puzzles and architect the future of digital solutions.",
  };
}

export default async function CareersPage() {
  const [jobs, pageData] = await Promise.all([
    getCareers(),
    getCareerPageData(),
  ]);

  const fallbackPageData: any = {
    heroBgImg: "https://images.unsplash.com/photo-1760611656615-db3fad24a314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    heroTagline: "Join our Talent Ecosystem",
    heroTitle: "Build your ^Legacy. with us.",
    heroDesc: "Recruiting pioneers to solve complex engineering puzzles and architect the future.",
  };

  return <CareersClient jobs={jobs || []} pageData={pageData || fallbackPageData} />;
}
