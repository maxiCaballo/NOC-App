import { LogDatasource } from '../../domain/datasources/log.datasource';
import { Log, LogSeverityLevel } from '../../domain/models/log.model';
import { LogRepository } from '../../domain/repository/log.repository';

export class LogRepositoryImpl implements LogRepository {
	constructor(private readonly logDatasource: LogDatasource) {}

	async saveLog(log: Log): Promise<void> {
		return this.logDatasource.saveLog(log);
	}
	async getLogs(severityLevel: LogSeverityLevel): Promise<Log[]> {
		return this.logDatasource.getLogs(severityLevel);
	}
}
