import { LogModel } from '../../data/mongo';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class MongoLogDataSource implements LogDataSource {
	async saveLog(log: LogEntity): Promise<void> {
		const newLog = await LogModel.create(log);

		console.log({ newLog });
	}

	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
		const logs = await LogModel.find({
			level: severityLevel,
		});
		const logEntities = logs.map((mongoLog) => LogEntity.fromObject(mongoLog));

		return logEntities;
	}
}
