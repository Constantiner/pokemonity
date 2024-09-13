import { Controller, Get, Param, Query } from "@nestjs/common";
import { PokedexService } from "./pokedex.service";

@Controller("pokedex")
export class PokedexController {
	constructor(private readonly pokedexService: PokedexService) {}

	@Get("search")
	async searchPokemon(@Query("name") name: string) {
		return await this.pokedexService.searchPokemon(name);
	}

	@Get("type")
	async getTypes() {
		return await this.pokedexService.getTypes();
	}

	@Get("type/:type")
	async getPokemonByType(@Param("type") type: string) {
		return await this.pokedexService.getPokemonByType(type);
	}
}
