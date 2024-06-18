import { LogEntity } from '../../entities/log.entity';
import { CheckService } from './check-service';

const mockRepository = {
	saveLog: jest.fn(),
	getLogs: jest.fn(),
};

const successCallback = jest.fn();
const errorCallback = jest.fn();

describe('CheckService tests', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const checkService = new CheckService(mockRepository, successCallback, errorCallback);

	test('should call success callback when returns true', async () => {
		const wasOk = await checkService.execute('https://www.google.com');

		expect(wasOk).toBeTruthy();
		expect(successCallback).toHaveBeenCalled();
		expect(errorCallback).not.toHaveBeenCalled();
		expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});

	test('should call error callback when returns false', async () => {
		const wasOk = await checkService.execute('https://www.fake-url.com');

		expect(wasOk).toBeFalsy();
		expect(errorCallback).toHaveBeenCalled();
		expect(successCallback).not.toHaveBeenCalled();
		expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
	});
});
