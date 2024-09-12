import { Client } from "@elastic/elasticsearch";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ElasticsearchService {
	constructor(@Inject("ELASTICSEARCH_CLIENT") private readonly elasticsearchClient: Client) {}

	async searchPokemon(name: string) {
		const result = await this.elasticsearchClient.search({
			index: "pokedex",
			body: {
				query: {
					match: { "name.english": name }
				}
			}
		});
		return result.hits.hits.map(hit => hit._source);
	}
}
