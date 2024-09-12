const { FlatCompat } = require("@eslint/eslintrc");
const nxEslintPlugin = require("@nx/eslint-plugin");
const js = require("@eslint/js");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

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
	{
		files: ["eslint.config.js", "apps/pokemonity/webpack.config.cjs"],
		rules: {
			"@typescript-eslint/no-require-imports": "off"
		}
	}
];
