import { Test, TestingModule } from "@nestjs/testing";
import { PokedexController } from "./pokedex.controller";
import { PokedexService } from "./pokedex.service";

describe("PokedexController", () => {
	let controller: PokedexController;
	let mockPokedexService: PokedexService;

	const mockPokedexServiceProvider = {
		searchPokemon: jest.fn().mockResolvedValue([]) // Mock searchPokemon method
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PokedexController],
			providers: [
				{
					provide: PokedexService,
					useValue: mockPokedexServiceProvider // Inject the mock service
				}
			]
		}).compile();

		controller = module.get<PokedexController>(PokedexController);
		mockPokedexService = module.get<PokedexService>(PokedexService);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("should call searchPokemon in the service", async () => {
		const result = await controller.searchPokemon("Pikachu");
		expect(mockPokedexService.searchPokemon).toHaveBeenCalledWith("Pikachu");
		expect(result).toEqual([]); // Since the mock resolves an empty array
	});
});
