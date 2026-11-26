import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "One star. Does no work, just reflects the Sun's light and takes all the credit. Worst coworker in the solar system.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

if (ENTRY.length < 1 || ENTRY.length > 120) {
  throw new Error(`entry must be 1-120 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}

console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
