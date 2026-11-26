// Entry for make.fun "The Moon Gets One Star": a single one-star review
// of the Moon, at most 120 characters, written to /output/entry.txt.
// Deterministic: the same text is written on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "One star. Does no work, just reflects the Sun's light and takes all the credit. Worst coworker in the solar system.";

// The competition gate: UTF-8 text of 1 to 120 characters, not only
// whitespace, on a single line. Fail loudly instead of writing bad output.
function checkGate(text) {
  if (text.length < 1 || text.length > 120) {
    throw new Error(`entry must be 1-120 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

checkGate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}

console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
