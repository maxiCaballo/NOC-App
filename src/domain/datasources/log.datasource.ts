import { LogModel, LogSeverityLevel } from '../models/log.model';

export abstract class LogDatasource {
	abstract saveLog(log: LogModel): Promise<void>;
	abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogModel[]>;
}
