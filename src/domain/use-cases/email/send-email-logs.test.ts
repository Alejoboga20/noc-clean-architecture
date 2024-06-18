import { EmailService } from '../../../presentation/email/email.service';
import { LogRepository } from '../../repository/log.repository';
import { SendEmailLogs } from './send-email-logs';

const mockEmailService = {
	sendMail: jest.fn().mockReturnValue(true),
	sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
};

const mockLogRepository = {
	saveLog: jest.fn(),
	getLogs: jest.fn(),
};

describe('SendEmailLogs Tests', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should call sendEmail', async () => {
		const sendEmailLogs = new SendEmailLogs(
			mockEmailService as any,
			mockLogRepository as LogRepository
		);

		const result = await sendEmailLogs.execute('test@email.com');

		expect(result).toBeTruthy();
		expect(mockEmailService.sendMail).toHaveBeenCalled();
		expect(mockLogRepository.saveLog).toHaveBeenCalled();
	});
});
