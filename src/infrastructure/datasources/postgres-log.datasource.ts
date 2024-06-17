import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

const prismaClient = new PrismaClient();

const severityEnum = {
	low: SeverityLevel.LOW,
	medium: SeverityLevel.MEDIUM,
	high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDataSource {
	async saveLog(log: LogEntity): Promise<void> {
		const severityLevel = severityEnum[log.level];

		const newLog = await prismaClient.logModel.create({
			data: {
				message: log.message,
				level: severityLevel,
				origin: log.origin,
			},
		});
	}

	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const level = severityEnum[severityLevel];

		const dbLogs = await prismaClient.logModel.findMany({
			where: {
				level,
			},
		});

		return dbLogs.map((dbLog) => LogEntity.fromObject(dbLog));
	}
}
