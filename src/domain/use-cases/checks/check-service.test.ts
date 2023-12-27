import { Log } from '../../models/log.model';
import { CheckService } from './check-service';

describe('Check-service.ts', () => {
	const mockRepository = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};
	const successCallback = jest.fn();
	const errorCallback = jest.fn();

	const checkservice = new CheckService(mockRepository, successCallback, errorCallback);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should call successCallback when fetch return true', async () => {
		const wasOk = await checkservice.execute('https://google.com');

		expect(wasOk).toBe(true);
		expect(successCallback).toHaveBeenCalled();
		expect(errorCallback).not.toHaveBeenCalled();
		expect(mockRepository.saveLog).toBeCalledWith(expect.any(Log));
	});
	test('should call errorCallback when fetch return an error', async () => {
		const errorURL = 'https://1341jadfsngvl;aids.com';
		const wasNotOk = await checkservice.execute(errorURL);

		expect(wasNotOk).toBe(false);
		expect(successCallback).not.toHaveBeenCalled();
		expect(errorCallback).toHaveBeenCalled();
		expect(mockRepository.saveLog).toBeCalledWith(expect.any(Log));
	});
});
