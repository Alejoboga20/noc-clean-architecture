import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImplementation } from './log.repository';

describe.only('LogRepositoryImplementation', () => {
	const mockLogDataSource = jest.fn();
	const logRepository = new LogRepositoryImplementation(mockLogDataSource as any);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should call datasource when saving log', () => {
		const newLog = new LogEntity({
			message: 'Test message',
			level: LogSeverityLevel.LOW,
			origin: 'Test origin',
		});

		logRepository.saveLog(newLog);

		expect(mockLogDataSource).toHaveBeenCalledTimes(1);
		expect(mockLogDataSource).toHaveBeenCalledWith(newLog);
	});
});
