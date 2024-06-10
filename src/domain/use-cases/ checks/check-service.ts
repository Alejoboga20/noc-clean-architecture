import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
	execute: (url: string) => Promise<boolean>;
}

type SucessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
	constructor(
		private readonly logRepository: LogRepository,
		private readonly successCallback: SucessCallback,
		private readonly errorCallback: ErrorCallback
	) {}

	async execute(url: string): Promise<boolean> {
		try {
			const request = await fetch(url);

			if (!request.ok) {
				throw new Error('Request failed');
			}

			const log = new LogEntity(`Service ${url} is up and running`, LogSeverityLevel.LOW);

			this.successCallback();
			this.logRepository.saveLog(log);
			return true;
		} catch (error) {
			const errorMessage = `${error}`;
			const log = new LogEntity(errorMessage, LogSeverityLevel.HIGH);

			this.logRepository.saveLog(log);
			this.errorCallback(errorMessage);
			return false;
		}
	}
}
