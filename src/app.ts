import { LogMongoModel, MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';
import { envs } from './config/plugins/envs.plugin';

//Funcion anonima autoinvocada
(() => {
	main();
})();

async function main() {
	await MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME,
	});

	// Server.start();
	// console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);
}
