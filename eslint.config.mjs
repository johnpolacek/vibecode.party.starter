import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**/*",
      "test-results/**/*",
      "tests-examples/**/*",
      "tests/**/*",
      "coverage/**/*",
      "dist/**/*",
      "build/**/*",
      "**/node_modules/**/*",
      "**/*.min.js",
      "**/*.bundle.js"
    ],
    rules: {
      // Disable noisy rules
      "@typescript-eslint/no-this-alias": "off",
      
      // Enable max-lines rule
      "max-lines": ["error", {
        max: 500,
        skipBlankLines: true,
        skipComments: true
      }]
    }
  }
];

export default eslintConfig;
