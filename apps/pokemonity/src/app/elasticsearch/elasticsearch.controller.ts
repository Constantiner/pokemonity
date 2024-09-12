import { Controller, Get, Query } from "@nestjs/common";
import { ElasticsearchService } from "./elasticsearch.service";

@Controller("pokemon")
export class ElasticsearchController {
	constructor(private readonly elasticsearchService: ElasticsearchService) {}

	@Get("search")
	async searchPokemon(@Query("name") name: string) {
		return await this.elasticsearchService.searchPokemon(name);
	}
}
