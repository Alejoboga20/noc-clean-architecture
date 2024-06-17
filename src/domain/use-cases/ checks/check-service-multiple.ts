import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceMultipleUseCase {
	execute: (url: string) => Promise<boolean>;
}

type SucessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
	constructor(
		private readonly logRepository: LogRepository[],
		private readonly successCallback: SucessCallback,
		private readonly errorCallback: ErrorCallback
	) {}

	private callRepositories(log: LogEntity): void {
		this.logRepository.forEach((repository) => {
			repository.saveLog(log);
		});
	}

	async execute(url: string): Promise<boolean> {
		try {
			const request = await fetch(url);

			if (!request.ok) {
				throw new Error('Request failed');
			}

			const log = new LogEntity({
				message: `Service ${url} is up and running`,
				level: LogSeverityLevel.LOW,
				origin: 'check-service.ts',
			});

			this.successCallback && this.successCallback();
			this.callRepositories(log);
			return true;
		} catch (error) {
			const errorMessage = `${error}`;
			const log = new LogEntity({
				message: errorMessage,
				level: LogSeverityLevel.HIGH,
				origin: 'check-service.ts',
			});

			this.callRepositories(log);
			this.errorCallback && this.errorCallback(errorMessage);
			return false;
		}
	}
}
