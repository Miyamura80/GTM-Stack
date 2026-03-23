import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { createRequire } from "module";
import type { Plugin } from "vite";

const require = createRequire(import.meta.url);
const jsYaml = require("js-yaml");

function yamlPlugin(): Plugin {
    return {
        name: "yaml-loader",
        transform(_code: string, id: string) {
            if (!id.endsWith(".yaml") && !id.endsWith(".yml")) return null;
            const raw = readFileSync(id, "utf-8");
            const parsed = jsYaml.load(raw);
            return {
                code: `export default ${JSON.stringify(parsed)};`,
                map: null,
            };
        },
    };
}

export default defineConfig({
    plugins: [react(), yamlPlugin()],
});
