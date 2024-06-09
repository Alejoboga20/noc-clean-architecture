import { CheckService } from '../domain/use-cases/ checks/check-service';
import { CronService } from './cron/cron-service';

export class Server {
	public static start() {
		console.log('Server started...');
		const url = 'https://www.google.com';

		const job = CronService.createJob('*/5 * * * * *', () =>
			new CheckService(
				() => console.log('Success callback: ', url),
				(error) => console.log(`Error callback: ${error}`)
			).execute(url)
		);
	}
}
