export default {
	displayName: "pokemonity-e2e",
	preset: "../../jest.preset.js",
	globalSetup: "<rootDir>/src/support/globalSetup.ts",
	globalTeardown: "<rootDir>/src/support/globalTeardown.ts",
	setupFiles: ["<rootDir>/src/support/testSetup.ts"],
	testEnvironment: "node",
	transform: {
		"^.+\\.[tj]s$": [
			"ts-jest",
			{
				tsconfig: "<rootDir>/tsconfig.spec.json"
			}
		]
	},
	moduleFileExtensions: ["ts", "js", "html"],
	coverageDirectory: "../../coverage/pokemonity-e2e"
};
