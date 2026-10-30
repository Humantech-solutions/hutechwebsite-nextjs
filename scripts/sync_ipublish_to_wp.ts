import * as fs from "fs";
import * as path from "path";

// 1. Manually load .env.local if not already loaded
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...valParts] = trimmed.split("=");
      const k = key.trim();
      const v = valParts.join("=").trim().replace(/^["']|["']$/g, "");
      if (!process.env[k]) {
        process.env[k] = v;
      }
    }
  }
}

import { reconcileAllIPublishPostsWithWordPress, getWordPressSyncStatus } from "../lib/wordpress-sync";

async function main() {
  console.log("=================================================");
  console.log("  iPublish to WordPress Blog Post Synchronizer   ");
  console.log("=================================================\n");

  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/graphql\/?$/i, "") || "https://cms.hutechsolutions.ai";
  const username = process.env.WORDPRESS_APPLICATION_USERNAME || process.env.WORDPRESS_USERNAME || "admin";
  const hasPassword = Boolean(process.env.WORDPRESS_APPLICATION_PASSWORD || process.env.WP_APP_PASSWORD);

  console.log(`WordPress Base URL: ${wpUrl}`);
  console.log(`WordPress User:     ${username}`);
  console.log(`Application Pwd:    ${hasPassword ? "Configured [OK]" : "NOT CONFIGURED [MISSING]"}\n`);

  if (!hasPassword) {
    console.log("---------------------------------------------------------------------------------");
    console.log("NOTICE: WordPress Application Password is required to store posts in WordPress.");
    console.log("Steps to generate an Application Password in WordPress:");
    console.log("  1. Log into WordPress Admin (e.g. https://cms.hutechsolutions.ai/wp-admin)");
    console.log("  2. Go to Users -> Profile (or Users -> All Users -> edit 'admin')");
    console.log("  3. Scroll down to 'Application Passwords'");
    console.log("  4. Enter a name (e.g. 'iPublish Sync') and click 'Add New Application Password'");
    console.log("  5. Copy the generated 24-character password");
    console.log("  6. Add it to .env.local as:");
    console.log("     WORDPRESS_APPLICATION_PASSWORD=\"xxxx xxxx xxxx xxxx xxxx xxxx\"");
    console.log("---------------------------------------------------------------------------------\n");
    console.log("Checking current status without password...\n");
  }

  try {
    const status = await getWordPressSyncStatus();
    console.log(`Found ${status.totalIPublishPosts} total content items in iPublish:`);
    status.ipublishPosts.forEach((p, idx) => {
      const state = p.existsInWp
        ? `[WP ID: ${p.wpPostId} | Status: ${p.wpStatus || "exists"}]`
        : `[PENDING SYNC]`;
      console.log(`  ${idx + 1}. [iPublish: ${p.status}] ${state} ${p.title} (${p.slug})`);
    });
    console.log("");

    if (hasPassword) {
      console.log("Starting full bidirectional reconciliation to WordPress...\n");
      const result = await reconcileAllIPublishPostsWithWordPress();
      console.log("-------------------------------------------------");
      console.log(`Sync Result:   ${result.message}`);
      console.log(`Created:       ${result.created}`);
      console.log(`Updated:       ${result.updated}`);
      console.log(`Drafted:       ${result.drafted}`);
      console.log(`Kept Published:${result.kept_published}`);
      console.log(`Failed:        ${result.failed}`);
      console.log("-------------------------------------------------");

      result.details.forEach((d) => {
        let icon = "🔄 UPDATED";
        if (d.action === "created") icon = "✅ CREATED";
        else if (d.action === "drafted") icon = "📝 DRAFTED";
        else if (d.action === "kept_published") icon = "🛡️ KEPT PUBLISHED";
        else if (d.action === "failed") icon = "❌ FAILED";
        console.log(
          `${icon} [${d.slug}] ${d.title} ${d.wpPostId ? `(WP ID: ${d.wpPostId})` : ""} [WP Status: ${d.status || "N/A"}] ${
            d.error ? `-> ${d.error}` : ""
          }`
        );
      });
    }
  } catch (error) {
    console.error("Sync script encountered an error:", error);
    process.exit(1);
  }
}

main();
