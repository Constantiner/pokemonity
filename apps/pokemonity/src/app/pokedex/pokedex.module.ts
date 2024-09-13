import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PokedexService } from "./pokedex.service";
import { PokedexController } from "./pokedex.controller";

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: "ELASTICSEARCH_CLIENT",
			useFactory: async (configService: ConfigService) => {
				const { Client } = await import("@elastic/elasticsearch");
				return new Client({
					node: `http://${configService.get<string>("ELASTICSEARCH_HOST")}:${configService.get<string>("ELASTICSEARCH_PORT")}`,
					auth: {
						username: configService.get<string>("ELASTICSEARCH_USERNAME") ?? "",
						password: configService.get<string>("ELASTICSEARCH_PASSWORD") ?? ""
					}
				});
			},
			inject: [ConfigService]
		},
		PokedexService
	],
	controllers: [PokedexController]
})
export class PokedexModule {}
