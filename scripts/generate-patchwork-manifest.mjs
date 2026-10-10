/**
 * Generates patchwork-registry.json (backend manifest) from the canonical
 * registry in src/patchwork/component-registry.js.
 *
 * Usage: npm run patchwork:manifest
 *
 * The manifest is a generated snapshot for the backend developer. Never
 * hand-edit it — edit the canonical registry and re-run this script.
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { patchworkComponentRegistry } from "../src/patchwork/component-registry.js";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const manifest = {
  schemaVersion: 1,
  framework: "react",
  repositoryRoot: ".",
  routeStyle: "single-page-anchors",
  generatedNote:
    "Generated from src/patchwork/component-registry.js — do not hand-edit. Regenerate with: npm run patchwork:manifest",
  components: patchworkComponentRegistry.map((entry) => ({ ...entry })),
};

const outPath = resolve(rootDir, "patchwork-registry.json");
writeFileSync(outPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(
  `Wrote ${outPath} with ${manifest.components.length} components.`,
);
