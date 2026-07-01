import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Life at Hutech Solutions",
  description: "Discover the vibrant workplace culture, growth opportunities, and employee experiences that define life at Hutech Solutions.",
  path: "/company/life-at-hutech/",
});

import PageClient from "./PageClient";
import { getLifeAtHutechPage } from "@/lib/wordpress";

export default async function LifeAtHutechPage() {
  const data = await getLifeAtHutechPage();
  return <PageClient data={data} />;
}
