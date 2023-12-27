import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { Log, LogSeverityLevel } from '../../domain/models/log.model';

describe('file-system.datasource.ts', () => {
	const logPath = path.join(__dirname, '../../../logs');

	beforeEach(() => {
		fs.rmSync(logPath, { recursive: true, force: true });
	});

	//Tests
	test('should create a log filesystem name if do no exist', () => {
		new FileSystemDatasource();
		const files = fs.readdirSync(logPath);
		expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
	});
	test('should save a log in logs-all path', () => {
		const logDataSource = new FileSystemDatasource();
		const log = new Log({
			level: LogSeverityLevel.low,
			message: 'test message',
			origin: 'file-system.datasource.test.ts',
		});
		logDataSource.saveLog(log);
		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

		expect(allLogs).toContain(JSON.stringify(log));
	});
	test('should save a log in logs-all path and logs-medium path', () => {
		const logDataSource = new FileSystemDatasource();
		const log = new Log({
			level: LogSeverityLevel.medium,
			message: 'test message',
			origin: 'file-system.datasource.test.ts',
		});
		logDataSource.saveLog(log);
		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
		const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

		expect(allLogs).toContain(JSON.stringify(log));
		expect(mediumLogs).toContain(JSON.stringify(log));
	});
	test('should save a log in logs-all path and logs-high path', () => {
		const logDataSource = new FileSystemDatasource();
		const log = new Log({
			level: LogSeverityLevel.high,
			message: 'test message',
			origin: 'file-system.datasource.test.ts',
		});
		logDataSource.saveLog(log);
		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
		const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

		expect(allLogs).toContain(JSON.stringify(log));
		expect(highLogs).toContain(JSON.stringify(log));
	});
	test('should return all logs', async () => {
		const logDataSource = new FileSystemDatasource();
		const logLow = new Log({
			level: LogSeverityLevel.low,
			message: 'log-low',
			origin: 'file-system.datasource.test.ts',
		});
		const logMedium = new Log({
			level: LogSeverityLevel.medium,
			message: 'log-medium',
			origin: 'file-system.datasource.test.ts',
		});
		const logHigh = new Log({
			level: LogSeverityLevel.high,
			message: 'log-high',
			origin: 'file-system.datasource.test.ts',
		});

		await logDataSource.saveLog(logLow);
		await logDataSource.saveLog(logMedium);
		await logDataSource.saveLog(logHigh);

		const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
		const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
		const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);

		expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
		expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
		expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
	});
});
