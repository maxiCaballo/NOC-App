import { envs } from './envs.plugin';

describe('envs.plugins.ts', () => {
	test('should return envs options', () => {
		expect(envs).toEqual({
			PORT: 3000,
			MAILER_SERVICE: 'gmail',
			MAILER_EMAIL: 'caballomaxi@gmail.com',
			MAILER_SECRET_KEY: 'medv ejvb mmdd zqgu',
			PROD: true,
			MONGO_URL: 'mongodb://maxi:123456789@localhost:27017',
			MONGO_DB_NAME: 'NOC-TEST',
			MONGO_USER: 'maxi',
			MONGO_PASSWORD: '123456789',
		});
	});

	test('should return an error if PORT is not a number', async () => {
		jest.resetModules();
		process.env.PORT = 'ABC'; //Modifico la variable a string
		const message = '"PORT" should be a valid integer';

		try {
			await import('./envs.plugin');
			expect(true).toBe(false); //Fuerzo el error
		} catch (error) {
			expect(`${error}`).toContain(message);
		}
	});
});
