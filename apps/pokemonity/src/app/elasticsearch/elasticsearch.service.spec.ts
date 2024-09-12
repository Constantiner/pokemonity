import { Test, TestingModule } from "@nestjs/testing";
import { ElasticsearchService } from "./elasticsearch.service";

describe("ElasticsearchService", () => {
	let service: ElasticsearchService;

	const mockElasticsearchClient = {
		search: jest.fn().mockResolvedValue({ hits: { hits: [] } }) // Mock search method, you can customize the return value
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ElasticsearchService,
				{
					provide: "ELASTICSEARCH_CLIENT",
					useValue: mockElasticsearchClient // Inject the mock client
				}
			]
		}).compile();

		service = module.get<ElasticsearchService>(ElasticsearchService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should call the search method on Elasticsearch client", async () => {
		const result = await service.searchPokemon("Pikachu");
		expect(mockElasticsearchClient.search).toHaveBeenCalledWith({
			index: "pokedex",
			body: {
				query: {
					match: { "name.english": "Pikachu" }
				}
			}
		});
		expect(result).toEqual([]); // As we mocked an empty result set
	});
});
