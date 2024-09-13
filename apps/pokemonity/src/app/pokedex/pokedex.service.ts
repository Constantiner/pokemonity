import { Client } from "@elastic/elasticsearch";
import { Inject, Injectable } from "@nestjs/common";
import { PokedexEntry, PokeType } from "../../schema/pokedex";
import { isNonNullable } from "../../util/nullable";

@Injectable()
export class PokedexService {
	constructor(@Inject("ELASTICSEARCH_CLIENT") private readonly elasticsearchClient: Client) {}

	async searchPokemon(name: string) {
		const result = await this.elasticsearchClient.search<PokedexEntry>({
			index: "pokedex",
			body: {
				query: {
					fuzzy: { "name.english": name }
				}
			}
		});
		return result.hits.hits.map(hit => hit._source).filter(isNonNullable);
	}

	async getTypes() {
		const result = await this.elasticsearchClient.search<PokeType>({
			index: "poketypes",
			body: {
				query: {
					match_all: {}
				}
			}
		});
		return result.hits.hits
			.map(hit => hit._source)
			.filter(isNonNullable)
			.map(type => type.english);
	}

	async getPokemonByType(type: string) {
		const result = await this.elasticsearchClient.search<PokedexEntry>({
			index: "pokedex",
			body: {
				query: {
					term: {
						"type.keyword": type // Use term query with .keyword to search exact values
					}
				}
			}
		});
		return result.hits.hits.map(hit => hit._source).filter(isNonNullable);
	}
}
