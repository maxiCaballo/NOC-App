import { Log, LogSeverityLevel } from '../models/log.model';
import { LogDatasource } from './log.datasource';

describe('log.datasource.ts', () => {
	const newLog = new Log({
		origin: 'log.datasource.test.ts',
		message: 'test-message',
		level: LogSeverityLevel.low,
	});
	class MockLogDataSource implements LogDatasource {
		async saveLog(log: Log): Promise<void> {
			return;
		}
		async getLogs(severityLevel: LogSeverityLevel): Promise<Log[]> {
			return [newLog];
		}
	}

	test('should test the abstract class', async () => {
		const mockLogDataSource = new MockLogDataSource();

		expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
		expect(typeof mockLogDataSource.saveLog).toBe('function');
		expect(typeof mockLogDataSource.getLogs).toBe('function');

		await mockLogDataSource.saveLog(newLog);
		const logs = await mockLogDataSource.getLogs(LogSeverityLevel.high);
		expect(logs).toHaveLength(1);
		expect(logs[0]).toBeInstanceOf(Log);
	});
});
