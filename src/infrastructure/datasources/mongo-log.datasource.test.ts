import { envs } from '../../config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from '../../data/mongo';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { MongoLogDataSource } from './mongo-log.datasource';

const log = new LogEntity({
	message: 'Test message',
	level: LogSeverityLevel.LOW,
	origin: 'Test origin',
});

describe('MongoLogDataSource Tests', () => {
	beforeEach(async () => {
		await LogModel.deleteMany({});
	});

	beforeAll(async () => {
		await MongoDatabase.connect({
			dbName: envs.MONGO_DB_NAME,
			mongoUrl: envs.MONGO_URL,
		});
	});

	afterAll(async () => {
		await MongoDatabase.disconnect();
	});

	test('should create a log', async () => {
		const logDataSource = new MongoLogDataSource();
		const logSpy = jest.spyOn(console, 'log');

		await logDataSource.saveLog(log);
		expect(logSpy).toHaveBeenCalledWith(
			expect.objectContaining({ newLog: expect.objectContaining({ message: log.message }) })
		);
	});

	test('should get logs', async () => {
		const logDataSource = new MongoLogDataSource();
		await logDataSource.saveLog(log);
		await logDataSource.saveLog(log);

		const logs = await logDataSource.getLogs(LogSeverityLevel.LOW);

		expect(logs).toHaveLength(2);
		expect(logs[0].message).toBe(log.message);
	});
});
