import { CronService } from './cron/cron-service';

export class Server {
	public static start() {
		console.log('Server started...');
		const job = CronService.createJob('*/5 * * * * *', () => {
			console.log('Cron Job running...');
		});
	}
}
