import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import jsYaml from "js-yaml";
import type { Plugin } from "vite";

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
