import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { getEnvironmentFiles } from "../util/environment";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ElasticsearchModule } from "./elasticsearch/elasticsearch.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true, // This makes the configuration available throughout the app
			envFilePath: getEnvironmentFiles("../../.env")
		}),
		ElasticsearchModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
