interface CheckServiceUseCase {
	execute: (url: string) => Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
	async execute(url: string): Promise<boolean> {
		try {
			const request = await fetch(url);

			if (!request.ok) {
				throw new Error('Request failed');
			}
			console.log(`Request to ${url} was successful!`);
			return true;
		} catch (error) {
			console.log(`${error}`);
			return false;
		}
	}
}
