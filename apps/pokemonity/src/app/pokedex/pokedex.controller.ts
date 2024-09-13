import { Controller, Get, Query } from "@nestjs/common";
import { PokedexService } from "./pokedex.service";

@Controller("pokedex")
export class PokedexController {
	constructor(private readonly pokedexService: PokedexService) {}

	@Get("search")
	async searchPokemon(@Query("name") name: string) {
		return await this.pokedexService.searchPokemon(name);
	}
}
