import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsYaml from "js-yaml";
import type { Plugin } from "vite";

function yamlPlugin(): Plugin {
    return {
        name: "yaml-loader",
        transform(code: string, id: string) {
            if (!id.endsWith(".yaml") && !id.endsWith(".yml")) return null;
            const parsed = jsYaml.load(code);
            return {
                code: `export default ${JSON.stringify(parsed)};`,
                map: null,
            };
        },
    };
}

export default defineConfig({
    plugins: [react(), yamlPlugin()],
    server: {
        fs: {
            allow: [".."],
        },
    },
});
