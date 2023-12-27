import { MongoDatabase } from './init';

describe('init MongoDB', () => {
	test('should connect to MongoDB', async () => {
		console.log(process.env.MONGO_DB_NAME, process.env.MONGO_URL, process.env.MONGO_PASSWORD, process.env.MONGO_USER);

		const connected = await MongoDatabase.connect({
			dbName: process.env.MONGO_DB_NAME!,
			mongoUrl: process.env.MONGO_URL!,
		});
	});
});
