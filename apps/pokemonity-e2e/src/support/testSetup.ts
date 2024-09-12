import axios from "axios";

// eslint-disable-next-line unicorn/prefer-module -- For some reason only supports module.exports.
module.exports = async function testSetup() {
	// Configure axios for tests to use.
	const host = process.env.HOST ?? "localhost";
	const port = process.env.PORT ?? "3000";
	axios.defaults.baseURL = `http://${host}:${port}`;
};
