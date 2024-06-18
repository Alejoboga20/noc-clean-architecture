import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface SendEmailLogsUseCase {
	execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendEmailLogsUseCase {
	constructor(
		private readonly emailService: EmailService,
		private readonly logRepository: LogRepository
	) {}

	async execute(to: string | string[]): Promise<boolean> {
		try {
			const sent = await this.emailService.sendMail({
				to,
				subject: 'Logs from the file system',
				htmlBody: 'Please find the logs attached to this email',
			});

			if (!sent) throw new Error('Email not sent');

			const log = new LogEntity({
				level: LogSeverityLevel.LOW,
				message: `Email sent to ${to}`,
				origin: 'send-email-logs.ts',
			});
			this.logRepository.saveLog(log);

			return true;
		} catch (error) {
			const log = new LogEntity({
				level: LogSeverityLevel.HIGH,
				message: `Email not sent to ${to}`,
				origin: 'send-email-logs.ts',
			});
			this.logRepository.saveLog(log);
			return false;
		}
	}
}
