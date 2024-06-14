import { CheckService } from '../domain/use-cases/ checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

// const logRepository = new LogRepositoryImplementation(new FileSystemDatasource());
const logRepository = new LogRepositoryImplementation(new MongoLogDataSource());
const emailService = new EmailService();

export class Server {
	public static start() {
		console.log('Server started...');
		const url = 'https://www.google.com';

		const sendEmail = new SendEmailLogs(emailService, logRepository);
		// sendEmail.execute('alejo@zelta.ai');

		const job = CronService.createJob('*/5 * * * * *', () =>
			new CheckService(
				logRepository,
				() => console.log('Success callback: ', url),
				(error) => console.log(`Error callback: ${error}`)
			).execute(url)
		);
		job.start();
	}
}
