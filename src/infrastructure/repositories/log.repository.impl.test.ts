import { LogDatasource } from '../../domain/datasources/log.datasource';
import { Log, LogSeverityLevel } from '../../domain/models/log.model';
import { LogRepositoryImpl } from './log.repository.impl';

describe('log.repository.impl', () => {
	const logTest = new Log({
		origin: 'log.datasource.test.ts',
		message: 'test-message',
		level: LogSeverityLevel.low,
	});

	const mockLogDatasource = {
		saveLog: jest.fn(),
		getLogs: jest.fn(),
	};

	const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('saveLog should call the datasource with arguments', async () => {
		await logRepositoryImpl.saveLog(logTest);
		expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(logTest);
	});
	test('getLogs should call the datasource with arguments', async () => {
		const severityLevel = LogSeverityLevel.low;

		await logRepositoryImpl.getLogs(severityLevel);
		expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(severityLevel);
	});
});
