import { readdir, readFile, writeFile, stat } from "fs/promises";
import { join, extname } from "path";
import { format } from "prettier";

const OUT_DIR = "./out";

async function walkDir(dir) {
  let files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...(await walkDir(fullPath)));
      } else if (extname(entry.name) === ".html") {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Ignore if directory doesn't exist
  }
  return files;
}

async function main() {
  let htmlFiles;
  try {
    htmlFiles = await walkDir(OUT_DIR);
  } catch (err) {
    console.error(`❌ Could not read "${OUT_DIR}" directory. Run "npm run build" first.`);
    process.exit(1);
  }

  if (htmlFiles.length === 0) {
    console.log("No HTML files found in out/");
    return;
  }

  console.log(`✨ Prettifying ${htmlFiles.length} HTML files...`);

  let success = 0;
  for (const file of htmlFiles) {
    try {
      const raw = await readFile(file, "utf8");
      const formatted = await format(raw, {
        parser: "html",
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        htmlWhitespaceSensitivity: "css",
        endOfLine: "lf",
      });
      await writeFile(file, formatted, "utf8");
      success++;
    } catch (err) {
      console.warn(`⚠ Skipped ${file}: ${err.message}`);
    }
  }

  console.log(`✅ Done! Formatted ${success}/${htmlFiles.length} files.`);
}

main();
