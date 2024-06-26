import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/ checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/ checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImplementation(new FileSystemDatasource());
const mongoDbLogRepository = new LogRepositoryImplementation(new MongoLogDataSource());
const postgresLogRepository = new LogRepositoryImplementation(new PostgresLogDataSource());

const emailService = new EmailService();

export class Server {
	public static async start() {
		console.log('Server started...');
		const url = 'https://www.google.com';

		const sendEmail = new SendEmailLogs(emailService, fileSystemLogRepository);
		const logs = await fileSystemLogRepository.getLogs(LogSeverityLevel.HIGH);
		// console.log({ logs });
		// sendEmail.execute('alejo@zelta.ai');

		// const job = CronService.createJob('*/5 * * * * *', () =>
		// 	new CheckService(
		// 		logRepository,
		// 		() => console.log('Success callback: ', url),
		// 		(error) => console.log(`Error callback: ${error}`)
		// 	).execute(url)
		// );
		// job.start();
		const job = CronService.createJob('*/5 * * * * *', () =>
			new CheckServiceMultiple(
				[fileSystemLogRepository, mongoDbLogRepository, postgresLogRepository],
				() => console.log('Success callback: ', url),
				(error) => console.log(`Error callback: ${error}`)
			).execute(url)
		);
		job.start();
	}
}
