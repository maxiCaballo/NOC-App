import { LogDatasource } from '../../domain/datasources/log.datasource';
import { Log, LogSeverityLevel } from '../../domain/models/log.model';
import fs from 'fs';

export class FileSystemDatasource implements LogDatasource {
	private readonly logPath = 'logs/';
	private readonly allLogsPath = 'logs/logs-all.log';
	private readonly mediumLogsPath = 'logs/logs-medium.log';
	private readonly highLogsPath = 'logs/logs-high.log';

	//Cada vez que instancio esta clase me aseguro que se creen los directorios si es que no estan creados
	//sino daria error a la hora de grabar o intentar leer...
	constructor() {
		this.createLogsFiles();
	}

	private createLogsFiles = () => {
		if (!fs.existsSync(this.logPath)) {
			fs.mkdirSync(this.logPath);
		}

		[this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach((path) => {
			if (!fs.existsSync(path)) fs.writeFileSync(path, '');
		});
	};
	async saveLog(newLog: Log): Promise<void> {
		const logAsJson = `${JSON.stringify(newLog)}\n`;

		fs.appendFileSync(this.allLogsPath, logAsJson);

		switch (newLog.level) {
			case LogSeverityLevel.low:
				break;
			case LogSeverityLevel.medium:
				fs.appendFileSync(this.mediumLogsPath, logAsJson);
				break;
			case LogSeverityLevel.high:
				fs.appendFileSync(this.highLogsPath, logAsJson);
				break;
		}
	}

	private getLogsFromFile = (path: string): Log[] => {
		const content = fs.readFileSync(path, 'utf-8');
		const logs = content.split('\n').map((log) => Log.jsonParse(log));

		return logs;
	};

	async getLogs(severityLevel: LogSeverityLevel): Promise<Log[]> {
		switch (severityLevel) {
			case LogSeverityLevel.low:
				return this.getLogsFromFile(this.allLogsPath);
			case LogSeverityLevel.medium:
				return this.getLogsFromFile(this.mediumLogsPath);
			case LogSeverityLevel.high:
				return this.getLogsFromFile(this.highLogsPath);
			default:
				throw new Error(`${severityLevel} not implemented`);
		}
	}
}
