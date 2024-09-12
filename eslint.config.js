const { FlatCompat } = require("@eslint/eslintrc");
const nxEslintPlugin = require("@nx/eslint-plugin");
const js = require("@eslint/js");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const eslintPluginUnicorn = require("eslint-plugin-unicorn");

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended
});

module.exports = [
	{ plugins: { "@nx": nxEslintPlugin } },
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.cjs", "**/*.mjs"],
		rules: {
			"@nx/enforce-module-boundaries": [
				"error",
				{
					enforceBuildableLibDependency: true,
					allow: [],
					depConstraints: [
						{
							sourceTag: "*",
							onlyDependOnLibsWithTags: ["*"]
						}
					]
				}
			]
		}
	},
	...compat.config({ extends: ["plugin:@nx/typescript"] }).map(config => ({
		...config,
		files: ["**/*.ts", "**/*.tsx"],
		rules: {
			...config.rules
		}
	})),
	...compat.config({ extends: ["plugin:@nx/javascript"] }).map(config => ({
		...config,
		files: ["**/*.js", "**/*.jsx", "**/*.cjs", "**/*.mjs"],
		rules: {
			...config.rules
		}
	})),
	...compat.config({ env: { jest: true } }).map(config => ({
		...config,
		files: ["**/*.spec.ts", "**/*.spec.tsx", "**/*.spec.js", "**/*.spec.jsx"],
		rules: {
			...config.rules
		}
	})),
	eslintPluginPrettierRecommended,
	eslintPluginUnicorn.configs["flat/recommended"],
	{
		// Unicorn
		rules: {
			"unicorn/filename-case": ["error", { case: "camelCase" }],
			"unicorn/no-fn-reference-in-iterator": "off",
			"unicorn/no-reduce": "off",
			"unicorn/no-null": "off",
			"unicorn/switch-case-braces": "off",
			"unicorn/prefer-at": "off",
			"unicorn/no-array-reduce": "off",
			"unicorn/no-array-for-each": "off",
			"unicorn/no-array-callback-reference": "off",
			"unicorn/prefer-node-protocol": "off",
			"unicorn/prefer-object-from-entries": ["off"],
			"unicorn/no-useless-undefined": "off",
			"unicorn/import-style": [
				"error",
				{
					styles: {
						"node:path": {
							named: true
						},
						path: {
							named: true
						}
					}
				}
			]
		}
	},
	{
		files: ["eslint.config.js", "apps/pokemonity/webpack.config.cjs"],
		rules: {
			"@typescript-eslint/no-require-imports": "off"
		}
	}
];
