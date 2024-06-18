import { LogEntity, LogSeverityLevel } from './log.entity';

const dataObj = {
	message: 'Test message',
	level: LogSeverityLevel.LOW,
	origin: 'test',
};

describe('Log entity tests', () => {
	test('should create a LogEntity instance', () => {
		const log = new LogEntity({ ...dataObj });

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe(dataObj.message);
		expect(log.level).toBe(dataObj.level);
		expect(log.origin).toBe(dataObj.origin);
		expect(log.createdAt).toBeInstanceOf(Date);
	});

	test('should create entity from json', () => {
		const log = LogEntity.fromJson(JSON.stringify(dataObj));

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe(dataObj.message);
		expect(log.level).toBe(dataObj.level);
		expect(log.origin).toBe(dataObj.origin);
		expect(log.createdAt).toBeInstanceOf(Date);
	});

	test('should create entity from object', () => {
		const log = LogEntity.fromObject(dataObj);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe(dataObj.message);
		expect(log.level).toBe(dataObj.level);
		expect(log.origin).toBe(dataObj.origin);
		expect(log.createdAt).toBeInstanceOf(Date);
	});
});
