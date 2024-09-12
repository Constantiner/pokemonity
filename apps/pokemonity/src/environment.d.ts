declare namespace NodeJS {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	interface ProcessEnv {
		ELASTICSEARCH_HOST: string;
		ELASTICSEARCH_PORT: string;
		ELASTICSEARCH_USERNAME: string;
		ELASTICSEARCH_PASSWORD: string;
	}
}
