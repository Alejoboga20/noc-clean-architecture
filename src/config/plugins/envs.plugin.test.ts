import { envs } from './envs.plugin';

describe('ENVs Tests', () => {
	test('should return env options', () => {
		expect(envs).toEqual({
			PORT: expect.any(Number),
			MAILER_MAIL: expect.any(String),
			MAILER_SECRET_KEY: expect.any(String),
			MAILER_SERVICE: 'gmail',
			PROD: false,
			MONGO_URL: expect.any(String),
			MONGO_DB_NAME: expect.any(String),
			MONGO_USER: expect.any(String),
			MONGO_PASS: expect.any(String),
		});
	});

	test('should return error if env not found', async () => {
		jest.resetModules();
		process.env.PORT = 'ABC';

		try {
			await import('./envs.plugin');
		} catch (error) {
			expect(`${error}`).toContain('should be a valid integer');
		}
	});
});
