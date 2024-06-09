interface CheckServiceUseCase {
	execute: (url: string) => Promise<boolean>;
}

type SucessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
	constructor(
		private readonly successCallback: SucessCallback,
		private readonly errorCallback: ErrorCallback
	) {}

	async execute(url: string): Promise<boolean> {
		try {
			const request = await fetch(url);

			if (!request.ok) {
				throw new Error('Request failed');
			}
			this.successCallback();
			console.log(`Request to ${url} was successful!`);
			return true;
		} catch (error) {
			this.errorCallback(`${error}`);
			console.log(`${error}`);
			return false;
		}
	}
}
