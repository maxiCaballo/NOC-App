import { Log, LogSeverityLevel } from '../models/log.model';

export abstract class LogRepository {
	abstract saveLog(log: Log): Promise<void>;
	abstract getLogs(severityLevel: LogSeverityLevel): Promise<Log[]>;
}
