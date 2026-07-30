import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "next-env.d.ts",
      "**.lock",
      "bun.lock*",
    ],
  },
]);

export default eslintConfig;
