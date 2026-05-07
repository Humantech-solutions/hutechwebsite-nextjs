import CareersClient from "./CareersClient";
import { JOBS } from "@/lib/data/careers";
import { Meta } from "@/components/Meta";

export const metadata = {
  title: "Careers | Hutech Solutions",
  description: "Join our talent ecosystem. We're recruiting pioneers to solve complex engineering puzzles and architect the future of digital solutions.",
};

export default function CareersPage() {
  return <CareersClient jobs={JOBS} />;
}
