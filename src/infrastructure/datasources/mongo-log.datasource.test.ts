import mongoose from 'mongoose';
import { LogMongoModel, MongoDatabase } from '../../data/mongo';
import { MongoLogDatasource } from './mongo-log.datasource';
import { Log, LogSeverityLevel } from '../../domain/models/log.model';

describe('mongo-log.datasource', () => {
	const logDataSource = new MongoLogDatasource();
	const log = new Log({
		level: LogSeverityLevel.low,
		message: 'test message',
		origin: 'mongo-log.datasource.test.ts',
	});

	beforeAll(async () => {
		await MongoDatabase.connect({
			dbName: process.env.MONGO_DB_NAME!,
			mongoUrl: process.env.MONGO_URL!,
		});
	});

	afterEach(async () => {
		await LogMongoModel.deleteMany();
	});
	afterAll(async () => {
		await mongoose.connection.close();
	});

	//Tests
	test('should create a log', async () => {
		const logSpy = jest.spyOn(console, 'log');

		await logDataSource.saveLog(log);

		expect(logSpy).toHaveBeenCalled();
		expect(logSpy).toHaveBeenCalledWith('Mongo Log created: ', expect.any(String));
	});

	test('should get logs', async () => {
		await logDataSource.saveLog(log);

		const logs = await logDataSource.getLogs(LogSeverityLevel.low);

		expect(logs.length).toBe(1);
		expect(logs[0].level).toBe(LogSeverityLevel.low);
	});
});
