import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { Log, LogSeverityLevel } from '../../domain/models/log.model';

const prismaClient = new PrismaClient();
const severityEnum = {
	high: SeverityLevel.HIGH,
	medium: SeverityLevel.MEDIUM,
	low: SeverityLevel.LOW,
};

export class PostgresLogDatsource implements LogDatasource {
	async saveLog(log: Log): Promise<void> {
		const level = severityEnum[log.level];

		await prismaClient.logModel.create({
			data: {
				...log,
				level,
			},
		});
	}
	async getLogs(severityLevel: LogSeverityLevel): Promise<Log[]> {
		const level = severityEnum[severityLevel];
		const dbLogs = await prismaClient.logModel.findMany({
			where: {
				level,
			},
		});

		return dbLogs.map((dbLog) => Log.fromObject(dbLog));
	}
}
