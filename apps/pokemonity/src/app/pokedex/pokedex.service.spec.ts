import { Test, TestingModule } from "@nestjs/testing";
import { PokedexService } from "./pokedex.service";

describe("PokedexService", () => {
	let service: PokedexService;

	// Mock the Elasticsearch client
	const mockElasticsearchClient = {
		search: jest.fn().mockResolvedValue({ hits: { hits: [] } }) // Mock search method
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PokedexService,
				{
					provide: "ELASTICSEARCH_CLIENT",
					useValue: mockElasticsearchClient // Inject the mock client
				}
			]
		}).compile();

		service = module.get<PokedexService>(PokedexService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should call the search method on Elasticsearch client for searchPokemon", async () => {
		const result = await service.searchPokemon("Pikachu");
		expect(mockElasticsearchClient.search).toHaveBeenCalledWith({
			index: "pokedex",
			body: {
				query: {
					fuzzy: { "name.english": "Pikachu" }
				}
			}
		});
		expect(result).toEqual([]); // As we mocked an empty result set
	});

	it("should call the search method on Elasticsearch client for getPokemonByType", async () => {
		// Mock response for the type query
		mockElasticsearchClient.search.mockResolvedValueOnce({
			hits: {
				hits: [
					{ _source: { id: 1, name: { english: "Bulbasaur" }, type: ["Grass", "Poison"] } },
					{ _source: { id: 2, name: { english: "Ivysaur" }, type: ["Grass", "Poison"] } }
				]
			}
		});

		const result = await service.getPokemonByType("Poison");
		expect(mockElasticsearchClient.search).toHaveBeenCalledWith({
			index: "pokedex",
			body: {
				query: {
					term: {
						"type.keyword": "Poison"
					}
				}
			}
		});

		// Check the result is returned as expected
		expect(result).toEqual([
			{ id: 1, name: { english: "Bulbasaur" }, type: ["Grass", "Poison"] },
			{ id: 2, name: { english: "Ivysaur" }, type: ["Grass", "Poison"] }
		]);
	});
});
