import { getHomePage } from "@/lib/wordpress";
import HomePageClient from "./HomePageClient";

// Revalidate every 60 seconds — WordPress changes appear within 1 minute
export const revalidate = 0;

export default async function Home() {
  const homeData = await getHomePage();

  return <HomePageClient data={homeData} />;
}