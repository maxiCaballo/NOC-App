import mongoose from 'mongoose';
import { MongoDatabase } from '../init';
import { LogMongoModel } from './log.mongo-model';

describe('log.mongo-mode.test.ts', () => {
	//Antes de ejecutar las pruebas me conecto a la DB
	//Recordar que no necesito importarme el dotenv para leer las variables de entorno
	//ya que lo hago en el archivo setupTests
	beforeAll(async () => {
		await MongoDatabase.connect({
			mongoUrl: process.env.MONGO_URL!,
			dbName: process.env.MONGO_DB_NAME!,
		});
	});
	//Despues de que ejecuto todos los tests me desconecto
	afterAll(async () => {
		mongoose.connection.close();
	});

	test('should return LogModel', async () => {
		const logData = {
			origin: 'log.mode.test.ts',
			message: 'test-message',
			level: 'low',
		};

		const log = await LogMongoModel.create(logData);
		expect(log).toEqual(
			expect.objectContaining({
				...logData,
				id: expect.any(String),
				createdAt: expect.any(Date),
			}),
		);

		await LogMongoModel.findByIdAndDelete(log.id);
	});
	test('should return the schema object', () => {
		const schema = LogMongoModel.schema.obj;
		console.log(schema);

		expect(schema).toEqual(
			expect.objectContaining({
				message: { type: expect.any(Function), required: true },
				origin: expect.any(Function),
				level: {
					type: expect.any(Function),
					enum: { values: ['low', 'medium', 'high'], message: '{VALUE} is not a valid type' },
				},
				createdAt: expect.any(Object),
			}),
		);
	});
});
