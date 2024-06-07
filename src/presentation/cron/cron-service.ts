import { CronJob } from 'cron';

type CronTime = string | Date;
type CronJobCallback = () => void;

export class CronService {
	public static createJob(cronTime: CronTime, onTick: CronJobCallback): CronJob {
		const job = new CronJob(cronTime, onTick);

		return job;
	}
}
