import { Test, TestingModule } from "@nestjs/testing";
import { PokedexController } from "./pokedex.controller";
import { PokedexService } from "./pokedex.service";

describe("PokedexController", () => {
	let controller: PokedexController;
	let mockPokedexService: PokedexService;

	const mockPokedexServiceProvider = {
		searchPokemon: jest.fn().mockResolvedValue([]), // Mock searchPokemon method
		getTypes: jest.fn().mockResolvedValue(["Fire", "Water", "Grass"]), // Mock getTypes method
		getPokemonByType: jest.fn().mockResolvedValue([
			// Mock getPokemonByType method
			{ id: 1, name: { english: "Bulbasaur" }, type: ["Grass", "Poison"] },
			{ id: 2, name: { english: "Ivysaur" }, type: ["Grass", "Poison"] }
		])
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

	it("should call getTypes in the service", async () => {
		const result = await controller.getTypes();
		expect(mockPokedexService.getTypes).toHaveBeenCalled(); // Verify the service method is called
		expect(result).toEqual(["Fire", "Water", "Grass"]); // Mocked return value
	});

	it("should call getPokemonByType in the service", async () => {
		// Act
		const result = await controller.getPokemonByType("Poison");

		// Assert
		expect(mockPokedexService.getPokemonByType).toHaveBeenCalledWith("Poison"); // Verify the method is called with "Poison"
		expect(result).toEqual([
			{ id: 1, name: { english: "Bulbasaur" }, type: ["Grass", "Poison"] },
			{ id: 2, name: { english: "Ivysaur" }, type: ["Grass", "Poison"] }
		]); // Mocked return value
	});
});
