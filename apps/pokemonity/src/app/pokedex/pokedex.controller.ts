import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PokedexService } from "./pokedex.service";

@ApiTags("pokedex")
@Controller("pokedex")
export class PokedexController {
	constructor(private readonly pokedexService: PokedexService) {}

	@Get("search")
	@ApiOperation({ summary: "Search Pokémon by name" })
	@ApiQuery({ name: "name", required: true, description: "Pokémon name" })
	@ApiResponse({ status: 200, description: "Returns a list of matching Pokémon" })
	async searchPokemon(@Query("name") name: string) {
		return await this.pokedexService.searchPokemon(name);
	}

	@Get("type")
	@ApiOperation({ summary: "Get all Pokémon types" })
	@ApiResponse({ status: 200, description: "Returns all Pokémon types" })
	async getTypes() {
		return await this.pokedexService.getTypes();
	}

	@Get("type/:type")
	@ApiOperation({ summary: "Get Pokémon by type" })
	@ApiParam({ name: "type", required: true, description: "Pokémon type" })
	@ApiResponse({ status: 200, description: "Returns all Pokémon of a given type" })
	async getPokemonByType(@Param("type") type: string) {
		return await this.pokedexService.getPokemonByType(type);
	}
}
