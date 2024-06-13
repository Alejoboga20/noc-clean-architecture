import { CheckService } from '../domain/use-cases/ checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImplementation } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';

const fileSystemRepository = new LogRepositoryImplementation(new FileSystemDatasource());

export class Server {
	public static start() {
		console.log('Server started...');
		const url = 'https://www.google.com';

		const emailService = new EmailService();

		emailService.sendMail({
			to: 'alejo@zelta.ai',
			subject: 'Server started',
			htmlBody: `
      <h3>Server started</h3>
      <p>Server started at ${new Date().toISOString()}</p>
      `,
		});

		const job = CronService.createJob('*/5 * * * * *', () =>
			new CheckService(
				fileSystemRepository,
				() => console.log('Success callback: ', url),
				(error) => console.log(`Error callback: ${error}`)
			).execute(url)
		);
		// job.start();
	}
}
