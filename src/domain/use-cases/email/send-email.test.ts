import { Log } from '../../models/log.model';
import { SendEmailLogs } from './send-email-logs';

describe('send-email.test.ts', () => {
	const mockEmailService = {
		sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
	};
	const mockRepository = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};
	const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockRepository);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should call sendEmail and saveLog succesfully', async () => {
		const result = await sendEmailLogs.execute('caballomaxi@gmail.com');

		expect(result).toBe(true);
		expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
		expect(mockRepository.saveLog).toBeCalledWith(expect.any(Log));
		expect(mockRepository.saveLog).toBeCalledWith({
			createdAt: expect.any(Date),
			level: 'low',
			message: 'Email was sent succesfully',
			origin: 'send-email-logs.ts',
		});
	});

	test('should call sendEmail and saveLog succesfully', async () => {
		mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);

		const result = await sendEmailLogs.execute('caballomaxi@gmail.com');

		expect(result).toBe(false);
		expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
		expect(mockRepository.saveLog).toBeCalledWith(expect.any(Log));
		expect(mockRepository.saveLog).toBeCalledWith({
			createdAt: expect.any(Date),
			level: 'high',
			message: expect.any(String),
			origin: 'send-email-logs.ts',
		});
	});
});
