import CareersClient from "./CareersClient";
import { getCareers, getCareerPageData } from "@/lib/wordpress";
import { JOBS } from "@/lib/data/careers";

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
    openingsTagline: "Open Opportunities",
    openingsTitle: "Join the \n Excellence Hub.",
    openingsNoJobsTitle: "No relevant opening for your skill set?",
    openingsNoJobsDesc: "We're always looking for exceptional talent. Drop your resume in our talent pool.",
    openingsGenBtn: "General Application",
    cultureTagline: "The Hutech Spirit",
    cultureTitle: "Innovation is \n our ^North Star.",
    cultureDesc: "We foster a culture of radical transparency and extreme ownership. Here, your ideas aren't just heard; they are engineered into reality.",
    cultureImg: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
    cultureStat1Val: "92%",
    cultureStat1Label: "Engineering Ratio",
    cultureStat2Val: "15+",
    cultureStat2Label: "Global Tech Hubs",
    cultureBadge1: "Great Place",
    cultureBadge2: "To Work Certified",
    hiringTagline: "Our Selection DNA",
    hiringDesc: "We look for clarity of thought, passion for problem-solving, and a commitment to excellence.",
    hiringSteps: [],
    benefitsTagline: "Perks & Benefits",
    benefitsTitle: "Investing \n in your \n ^Success.",
    benefitsDesc: "We provide the resources, environment, and support you need to do the best work of your life.",
    benefitsMainTitle: "Learning Budget",
    benefitsMainDesc: "$5,000 annual allowance for certifications, conferences, and courses.",
    benefitsGrid: [],
    internshipTagline: "Internship Programme",
    internshipTitle: "Launch Your Career ^at Nabhira",
    internshipDesc: "The Nabhira Emerging Talent Programme is a structured 12-week immersion into enterprise technology.",
    internshipImg: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
    internshipBadge1: "Applications Open",
    internshipBadge2: "2026 Cohort",
    internshipBtn1: "Apply Now",
    internshipBtn1Link: "#",
    internshipBtn2: "Download Brochure",
    internshipBtn2File: "#",
    internshipPrograms: [],
    whyTagline: "Career Advantage",
    whyTitle: "Why Nabhira is ^Different",
    whyPoints: [],
    ctaTitle: "Your Next Chapter \n starts ^now.",
    ctaDesc: "Join a global team of visionaries, engineers, and creatives working together to build a more agile and innovative future.",
    ctaCard1Title: "Interview Ready?",
    ctaCard1Desc: "Get tips for success",
    ctaCard2Title: "Fast-Track",
    ctaCard2Desc: "Hiring in 14 days",
  };

  return <CareersClient jobs={jobs.length > 0 ? jobs : JOBS} pageData={pageData || fallbackPageData} />;
}
