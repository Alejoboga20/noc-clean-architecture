import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

const logPath = path.join(__dirname, '../../../logs');

describe.skip('FileSystemDatasource Tests', () => {
	beforeEach(() => {
		fs.rmSync(logPath, { recursive: true, force: true });
	});

	test('should create log files if they do not exists', () => {
		new FileSystemDatasource();
		const files = fs.readdirSync(logPath);

		expect(files.length).toBe(3);
	});

	test('should save a log in low-logs.json file', async () => {
		const datasource = new FileSystemDatasource();

		const log = new LogEntity({
			message: 'Test message',
			level: LogSeverityLevel.LOW,
			origin: 'Test origin',
		});

		await datasource.saveLog(log);
		const allLogs = fs.readFileSync(`${logPath}/low-logs.json`, 'utf-8');
		expect(allLogs).toContain(JSON.stringify(log));
	});

	test('should save a log in low-logs.json and medium-logs.json', async () => {
		const datasource = new FileSystemDatasource();

		const log = new LogEntity({
			message: 'Test message',
			level: LogSeverityLevel.MEDIUM,
			origin: 'Test origin',
		});

		await datasource.saveLog(log);
		const allLogs = fs.readFileSync(`${logPath}/low-logs.json`, 'utf-8');
		const mediumLogs = fs.readFileSync(`${logPath}/medium-logs.json`, 'utf-8');

		expect(allLogs).toContain(JSON.stringify(log));
		expect(mediumLogs).toContain(JSON.stringify(log));
	});

	test('should return all logs', async () => {
		const datasource = new FileSystemDatasource();

		const lowLog = new LogEntity({
			message: 'Test message',
			level: LogSeverityLevel.LOW,
			origin: 'Test origin',
		});
		const mediumLog = new LogEntity({
			message: 'Test message',
			level: LogSeverityLevel.MEDIUM,
			origin: 'Test origin',
		});
		const highLog = new LogEntity({
			message: 'Test message',
			level: LogSeverityLevel.HIGH,
			origin: 'Test origin',
		});

		await datasource.saveLog(lowLog);
		await datasource.saveLog(mediumLog);
		await datasource.saveLog(highLog);

		const logs = await datasource.getLogs(LogSeverityLevel.LOW);
		expect(logs).toBeInstanceOf(Array);
	});
});
