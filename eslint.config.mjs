import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends(
        "next/core-web-vitals",
        "next/typescript",
        "standard",
        "plugin:import/recommended",
        "plugin:import/typescript",
        // "plugin:tailwindcss/recommended",
        "prettier"
    ),
    {
        rules: {
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling"],
                        "index",
                        "object",
                    ],
                    "newlines-between": "always",
                    pathGroups: [
                        {
                            pattern: "@app/**",
                            group: "external",
                            position: "after",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["builtin"],
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],
            "import/no-unresolved": "error",
            "import/no-duplicates": "error",
        },

        overrides: [
            {
                files: ["*.ts", "*.tsx"],
                rules: {
                    "no-undef": "off",
                    "no-unused-vars": "warn",
                },
            },
        ],
    },
];

export default eslintConfig;
