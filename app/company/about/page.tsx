import { getAboutPageData } from "@/lib/wordpress";
import AboutClient from "@/app/about/AboutClient";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About Hutech Solutions",
  description: "Learn more about Hutech Solutions, our journey, culture, and the team building world-class digital transformation solutions for global enterprises.",
  path: "/company/about/",
});

export default async function AboutCompanyPage() {
  const wpData = await getAboutPageData("/company/about/");
  return <AboutClient {...(wpData ?? {})} />;
}
