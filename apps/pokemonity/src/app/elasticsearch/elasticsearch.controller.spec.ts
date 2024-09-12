import { Test, TestingModule } from "@nestjs/testing";
import { ElasticsearchController } from "./elasticsearch.controller";
import { ElasticsearchService } from "./elasticsearch.service";

describe("ElasticsearchController", () => {
	let controller: ElasticsearchController;
	let mockElasticsearchService: ElasticsearchService;

	const mockElasticsearchServiceProvider = {
		searchPokemon: jest.fn().mockResolvedValue([]) // Mock searchPokemon method
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ElasticsearchController],
			providers: [
				{
					provide: ElasticsearchService,
					useValue: mockElasticsearchServiceProvider // Inject the mock service
				}
			]
		}).compile();

		controller = module.get<ElasticsearchController>(ElasticsearchController);
		mockElasticsearchService = module.get<ElasticsearchService>(ElasticsearchService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("should call searchPokemon in the service", async () => {
		const result = await controller.searchPokemon("Pikachu");
		expect(mockElasticsearchService.searchPokemon).toHaveBeenCalledWith("Pikachu");
		expect(result).toEqual([]); // Since the mock resolves an empty array
	});
});
