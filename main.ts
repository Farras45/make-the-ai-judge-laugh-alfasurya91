// Make the AI Judge Laugh — one-line office-life joke.
// Writes the winning line (and nothing else, no trailing newline) to /output/entry.txt.
//
// The joke in three beats, each carrying its own concrete noun or number
// so the line lands on one read aloud:
//   1. the scene — a fire drill moves 200 people to the car park in the rain;
//   2. the escalation — the manager takes attendance anyway;
//   3. the punch (5 words) — the fire itself is marked absent.
import { writeFileSync, mkdirSync } from "node:fs";

const segments: string[] = [
  "The fire drill evacuated 200 of us to the car park in the rain,",
  "where my manager took attendance",
  "and marked the fire as absent.",
];

function buildLine(parts: readonly string[]): string {
  const line = parts.join(" ");
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.trim() !== line) {
    throw new Error("entry line must be a single clean line");
  }
  return line;
}

const line = buildLine(segments);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
console.log(`Wrote ${line.length} characters to /output/entry.txt`);
