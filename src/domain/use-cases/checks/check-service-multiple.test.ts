import { Log } from '../../models/log.model';
import { CheckServiceMultiple } from './check-service-multiple';

describe('check-service-multiple.ts', () => {
	const mockRepositories = {
		1: {
			saveLog: jest.fn(),
			getLogs: jest.fn(),
		},
		2: {
			saveLog: jest.fn(),
			getLogs: jest.fn(),
		},
		3: {
			saveLog: jest.fn(),
			getLogs: jest.fn(),
		},
	};
	const values = Object.values(mockRepositories);

	const successCallback = jest.fn();
	const errorCallback = jest.fn();

	const checkservice = new CheckServiceMultiple(
		[mockRepositories[1], mockRepositories[2], mockRepositories[3]],
		successCallback,
		errorCallback,
	);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should call successCallback when fetch return true', async () => {
		const wasOk = await checkservice.execute('https://google.com');

		expect(wasOk).toBe(true);
		expect(successCallback).toHaveBeenCalled();
		expect(errorCallback).not.toHaveBeenCalled();

		values.forEach(({ saveLog }) => expect(saveLog).toBeCalledWith(expect.any(Log)));
	});
	test('should call errorCallback when fetch return an error', async () => {
		const errorURL = 'https://1341jadfsngvl;aids.com';
		const wasNotOk = await checkservice.execute(errorURL);

		expect(wasNotOk).toBe(false);
		expect(successCallback).not.toHaveBeenCalled();
		expect(errorCallback).toHaveBeenCalled();

		values.forEach(({ saveLog }) => expect(saveLog).toBeCalledWith(expect.any(Log)));
	});
});
