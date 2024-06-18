import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDataSource } from './log.datasource';

const newLog = new LogEntity({
	level: LogSeverityLevel.LOW,
	message: 'test message',
	origin: 'test origin',
});

describe('log datasource gests', () => {
	class MockLogDataSource implements LogDataSource {
		async saveLog(log: LogEntity): Promise<void> {}

		async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
			return [newLog];
		}
	}
	test('should test abstrack class', () => {
		const mockLogDataSource = new MockLogDataSource();

		expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
		expect(mockLogDataSource).toHaveProperty('getLogs');
		expect(mockLogDataSource).toHaveProperty('saveLog');
	});
});
