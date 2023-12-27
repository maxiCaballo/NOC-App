import { Log, LogSeverityLevel } from './log.model';

describe('log.model.test.ts', () => {
	const dataObj = {
		level: LogSeverityLevel.high,
		message: 'Hola mundo',
		origin: 'log.model.test.ts',
	};
	test('should create a LogModel instance', () => {
		const log = new Log(dataObj);

		expect(log).toBeInstanceOf(Log);
		expect(log.message).toBe(dataObj.message);
		expect(log.level).toBe(dataObj.level);
		expect(log.origin).toBe(dataObj.origin);
		expect(log.createdAt).toBeInstanceOf(Date);
	});
	test('should create a LogEntity instance from json', () => {
		const json = `{"message":"Service https://google.com is ok!","level":"low","origin":"check-service.ts","createdAt":"2023-12-21T18:47:25.203Z"}
	`;
		const log = Log.jsonParse(json);
		expect(log).toBeInstanceOf(Log);
		expect(log.message).toBe('Service https://google.com is ok!');
		expect(log.level).toBe('low');
		expect(log.origin).toBe('check-service.ts');
		expect(log.createdAt).toBeInstanceOf(Date);
	});
	test('should create a LogEntity instance from object', () => {
		const log = Log.fromObject(dataObj);
		expect(log).toBeInstanceOf(Log);
		expect(log.message).toBe(dataObj.message);
		expect(log.level).toBe(dataObj.level);
		expect(log.origin).toBe(dataObj.origin);
		expect(log.createdAt).toBeInstanceOf(Date);
	});
});
