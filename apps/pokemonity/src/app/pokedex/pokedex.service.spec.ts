import { Test, TestingModule } from "@nestjs/testing";
import { PokedexService } from "./pokedex.service";

describe("PokedexService", () => {
	let service: PokedexService;

	const mockElasticsearchClient = {
		search: jest.fn().mockResolvedValue({ hits: { hits: [] } }) // Mock search method, you can customize the return value
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

	it("should call the search method on Elasticsearch client when searching for Pokemon", async () => {
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

	it("should call the search method on Elasticsearch client when getting types", async () => {
		// Mock a response from Elasticsearch for the types query
		const mockResponse = {
			hits: {
				hits: [
					{ _source: { english: "Fire" } },
					{ _source: { english: "Water" } },
					{ _source: { english: "Grass" } }
				]
			}
		};

		// Update the mock to return the mock response for the getTypes method
		mockElasticsearchClient.search.mockResolvedValueOnce(mockResponse);

		const result = await service.getTypes();
		expect(mockElasticsearchClient.search).toHaveBeenCalledWith({
			index: "poketypes",
			body: {
				query: {
					match_all: {}
				}
			}
		});

		expect(result).toEqual(["Fire", "Water", "Grass"]);
	});
});
