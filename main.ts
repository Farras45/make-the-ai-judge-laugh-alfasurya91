// Make the AI Judge Laugh — one-line office-life joke.
// Writes the winning line (and nothing else, no trailing newline) to /output/entry.txt.
//
// The joke in three beats, each carrying its own concrete noun or number
// so the line lands on one read aloud:
//   1. scene — a fire drill moves 200 people to the car park in the rain;
//   2. escalation — the manager takes attendance anyway;
//   3. punch (5 words) — the fire itself is marked absent.
import { writeFileSync, mkdirSync } from "node:fs";

type Beat = "scene" | "escalation" | "punch";

interface Segment {
  text: string;
  beat: Beat;
}

const segments: Segment[] = [
  { text: "The fire drill evacuated 200 of us to the car park in the rain,", beat: "scene" },
  { text: "where my manager took attendance", beat: "escalation" },
  { text: "and marked the fire as absent.", beat: "punch" },
];

function buildLine(parts: readonly Segment[]): string {
  return parts.map((segment) => segment.text).join(" ");
}

function validateLine(line: string, parts: readonly Segment[]): string {
  const expectedOrder: Beat[] = ["scene", "escalation", "punch"];
  const beats = parts.map((segment) => segment.beat);
  if (beats.length !== expectedOrder.length || !beats.every((beat, i) => beat === expectedOrder[i])) {
    throw new Error(`segments must run in order: ${expectedOrder.join(" -> ")}`);
  }
  for (const segment of parts) {
    if (segment.text.length === 0 || segment.text.trim() !== segment.text) {
      throw new Error(`segment "${segment.beat}" must be non-empty with no surrounding whitespace`);
    }
  }
  if (line.includes("  ")) {
    throw new Error("entry line must not contain double spaces");
  }
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.trim() !== line) {
    throw new Error("entry line must be a single clean line");
  }
  if (!line.endsWith(".")) {
    throw new Error("entry line must end with a full stop");
  }
  return line;
}

const line = validateLine(buildLine(segments), segments);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
console.log(`Wrote ${line.length} characters to /output/entry.txt`);
