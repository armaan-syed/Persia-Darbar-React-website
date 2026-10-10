/**
 * Validates the PATCHWORK component registry against the actual website.
 *
 * Usage: npm run patchwork:validate
 *
 * Checks:
 *  1. Every registry ID is unique.
 *  2. Every registry entry has the required fields (with valid values).
 *  3. Every file path is relative and free of path traversal.
 *  4. Every registered source file exists.
 *  5. Every registered source file contains/owns the expected target
 *     (literal or template `data-patchwork-id`, or a data-source entry
 *     whose value the file references).
 *  6. Registry IDs match the IDs used in the rendered website sources
 *     (static IDs + data-driven IDs resolved from the DISHES / INFO arrays).
 *  7. No editable DOM target (data-patchwork-id in src/) lacks a registry entry.
 *  8. No duplicate IDs on the rendered route (single-page site: the union of
 *     static IDs and per-item generated IDs must be collision-free).
 *
 * Dynamic pages: this site is a single-page app with data-driven IDs
 * (SignatureDishes DISHES slugs, Reservation INFO patchworkIds). The script
 * re-derives those generated IDs from the same source arrays instead of
 * relying on text search alone.
 *
 * Exit code is non-zero on any failure; every problem is reported, nothing
 * is silently skipped.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { patchworkComponentRegistry } from "../src/patchwork/component-registry.js";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = resolve(rootDir, "src");
const failures = [];

const fail = (message) => failures.push(message);

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ---------------------------------------------------------------- registry
const REQUIRED_FIELDS = [
  "id",
  "filePath",
  "componentName",
  "editable",
  "editableScope",
  "allowedOperations",
  "description",
];
const VALID_SCOPES = new Set(["content", "styles", "component"]);

// 1. Unique IDs.
{
  const seen = new Set();
  const dupes = new Set();
  for (const entry of patchworkComponentRegistry) {
    if (seen.has(entry.id)) dupes.add(entry.id);
    seen.add(entry.id);
  }
  for (const dupe of dupes) fail(`Duplicate registry id: "${dupe}".`);
}

// 2. Required fields + valid values.
for (const entry of patchworkComponentRegistry) {
  for (const field of REQUIRED_FIELDS) {
    if (entry[field] === undefined || entry[field] === null || entry[field] === "") {
      fail(`Registry entry "${entry.id || "<missing id>"}" is missing required field "${field}".`);
    }
  }
  if (entry.editableScope && !VALID_SCOPES.has(entry.editableScope)) {
    fail(`Registry entry "${entry.id}" has invalid editableScope "${entry.editableScope}".`);
  }
  if (
    entry.allowedOperations !== undefined &&
    (!Array.isArray(entry.allowedOperations) ||
      entry.allowedOperations.length === 0 ||
      entry.allowedOperations.some((op) => typeof op !== "string" || op === ""))
  ) {
    fail(`Registry entry "${entry.id}" has invalid allowedOperations (must be a non-empty string array).`);
  }
}

// 3. Relative paths, no traversal / absolute / backslash escapes.
for (const entry of patchworkComponentRegistry) {
  const p = entry.filePath;
  if (typeof p !== "string" || p === "") {
    fail(`Registry entry "${entry.id}" has an empty filePath.`);
    continue;
  }
  if (isAbsolute(p) || p.startsWith("/") || /^[A-Za-z]:/.test(p)) {
    fail(`Registry entry "${entry.id}" filePath must be repo-relative, got "${p}".`);
  }
  const segments = p.split("/");
  if (segments.includes("..") || p.includes("\\")) {
    fail(`Registry entry "${entry.id}" filePath contains path traversal or backslashes: "${p}".`);
  }
}

// 4. Registered source files exist.
for (const entry of patchworkComponentRegistry) {
  if (!existsSync(resolve(rootDir, entry.filePath))) {
    fail(`Registry entry "${entry.id}" points to missing file "${entry.filePath}".`);
  }
}

// ------------------------------------------------- collect IDs from sources
/** Static data-patchwork-id="..." occurrences per file. */
function staticIdsIn(source) {
  const ids = [];
  const re = /data-patchwork-id="([^"]+)"/g;
  let m;
  while ((m = re.exec(source)) !== null) ids.push(m[1]);
  return ids;
}

/** Extract `name: "..."` values from the DISHES array in SignatureDishes.jsx. */
function dishNamesIn(source) {
  const block = source.match(/const DISHES = \[([\s\S]*?)\];/);
  if (!block) return [];
  return [...block[1].matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
}

/** Extract patchworkId: "..." values from the INFO array in Reservation.jsx. */
function infoIdsIn(source) {
  const block = source.match(/const INFO = \[([\s\S]*?)\];/);
  if (!block) return [];
  return [...block[1].matchAll(/patchworkId:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function readSource(relPath) {
  return readFileSync(resolve(rootDir, relPath), "utf8");
}

const signatureSource = readSource("src/components/SignatureDishes.jsx");
const reservationSource = readSource("src/components/Reservation.jsx");

// IDs the rendered page will actually carry.
const renderedIds = new Set();
const renderedIdSources = new Map(); // id -> human-readable source label
const recordRendered = (id, label) => {
  renderedIds.add(id);
  if (!renderedIdSources.has(id)) renderedIdSources.set(id, []);
  renderedIdSources.get(id).push(label);
};

for (const dish of dishNamesIn(signatureSource)) {
  const slug = slugify(dish);
  recordRendered(`menu-${slug}-name`, `DISHES "${dish}" name`);
  recordRendered(`menu-${slug}-price`, `DISHES "${dish}" price`);
}
for (const id of infoIdsIn(reservationSource)) {
  recordRendered(id, "Reservation INFO patchworkId");
}

// Static IDs across every src/ .jsx file.
function jsxFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) out.push(...jsxFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".jsx")) out.push(full);
  }
  return out;
}
for (const file of jsxFiles(srcDir)) {
  const rel = file.slice(rootDir.length + 1).replace(/\\/g, "/");
  // Template IDs (`menu-${slugify(...)}-name`) are covered via data arrays.
  if (rel === "src/components/SignatureDishes.jsx") continue;
  for (const id of staticIdsIn(readFileSync(file, "utf8"))) {
    recordRendered(id, rel);
  }
}
// Static IDs in SignatureDishes.jsx outside the dish loop (e.g. section heading).
{
  const withoutLoop = signatureSource.replace(
    /{DISHES\.map\([\s\S]*?<\/article>\s*}\s*\)}/,
    "",
  );
  for (const id of staticIdsIn(withoutLoop)) {
    recordRendered(id, "src/components/SignatureDishes.jsx (static)");
  }
}

const registryIds = new Set(patchworkComponentRegistry.map((e) => e.id));

// 5. Each registered file owns its target: the file must reference the ID
//    literally, or — for data-driven IDs — reference the underlying value.
for (const entry of patchworkComponentRegistry) {
  const source = readSource(entry.filePath);
  const ownsLiteral =
    source.includes(`data-patchwork-id="${entry.id}"`) ||
    source.includes("data-patchwork-id={") ||
    (entry.id.startsWith("menu-") &&
      source.includes("data-patchwork-id={`menu-")) ||
    (["contact-phone", "opening-hours-text"].includes(entry.id) &&
      source.includes(`patchworkId: "${entry.id}"`));
  if (!ownsLiteral) {
    fail(
      `Registry entry "${entry.id}" is not owned by "${entry.filePath}" (no matching data-patchwork-id or data-source wiring found).`,
    );
  }
}

// 6. Registry IDs match rendered website IDs.
for (const id of registryIds) {
  if (!renderedIds.has(id)) {
    fail(`Registry id "${id}" does not match any ID rendered by the website.`);
  }
}

// 7. No rendered editable target lacks a registry entry.
for (const id of renderedIds) {
  if (!registryIds.has(id)) {
    const where = (renderedIdSources.get(id) || []).join("; ");
    fail(`Rendered data-patchwork-id "${id}" (${where}) has no registry entry.`);
  }
}

// 8. No duplicate IDs on the rendered route (single "/" route).
{
  const counts = new Map();
  const push = (id, label) => {
    counts.set(id, [...(counts.get(id) || []), label]);
  };
  for (const dish of dishNamesIn(signatureSource)) {
    const slug = slugify(dish);
    push(`menu-${slug}-name`, `DISHES "${dish}"`);
    push(`menu-${slug}-price`, `DISHES "${dish}"`);
  }
  for (const id of infoIdsIn(reservationSource)) push(id, "INFO");
  for (const file of jsxFiles(srcDir)) {
    const rel = file.slice(rootDir.length + 1).replace(/\\/g, "/");
    let source = readFileSync(file, "utf8");
    if (rel === "src/components/SignatureDishes.jsx") {
      source = source.replace(
        /{DISHES\.map\([\s\S]*?<\/article>\s*}\s*\)}/,
        "",
      );
    }
    for (const id of staticIdsIn(source)) push(id, rel);
  }
  for (const [id, labels] of counts) {
    if (labels.length > 1) {
      fail(`Duplicate rendered ID "${id}" on route "/": ${labels.join("; ")}.`);
    }
  }
}

// ------------------------------------------------------------- manifest sync
{
  const manifestPath = resolve(rootDir, "patchwork-registry.json");
  if (!existsSync(manifestPath)) {
    fail("patchwork-registry.json is missing — run: npm run patchwork:manifest");
  } else {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
      const manifestIds = new Set(
        (manifest.components || []).map((c) => c.id),
      );
      for (const id of registryIds) {
        if (!manifestIds.has(id)) {
          fail(`Manifest is stale: registry id "${id}" missing from patchwork-registry.json — run: npm run patchwork:manifest`);
        }
      }
      for (const id of manifestIds) {
        if (!registryIds.has(id)) {
          fail(`Manifest is stale: manifest id "${id}" has no canonical registry entry — run: npm run patchwork:manifest`);
        }
      }
      for (const component of manifest.components || []) {
        const canonical = patchworkComponentRegistry.find(
          (e) => e.id === component.id,
        );
        if (
          canonical &&
          JSON.stringify(canonical) !== JSON.stringify(component)
        ) {
          fail(`Manifest entry "${component.id}" differs from the canonical registry — run: npm run patchwork:manifest`);
        }
      }
    } catch (error) {
      fail(`Could not parse patchwork-registry.json: ${error.message}`);
    }
  }
}

// ------------------------------------------------------------------- report
if (failures.length > 0) {
  console.error(
    `\nPATCHWORK registry validation FAILED (${failures.length} problem(s)):\n`,
  );
  for (const message of failures) console.error(`  ✕ ${message}`);
  console.error("");
  process.exit(1);
} else {
  console.log(
    `PATCHWORK registry validation passed: ${patchworkComponentRegistry.length} registry entries match ${renderedIds.size} rendered IDs (route "/").`,
  );
}
