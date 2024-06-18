import { envs } from '../../config/plugins/envs.plugin';
import { MongoDatabase } from './init';

describe('init mongo tests', () => {
	afterAll(async () => {
		await MongoDatabase.disconnect();
	});

	test('should connect to mongodb', async () => {
		const connected = await MongoDatabase.connect({
			dbName: envs.MONGO_DB_NAME,
			mongoUrl: envs.MONGO_URL,
		});

		expect(connected).toBeTruthy();
		await MongoDatabase.disconnect();
	});

	test('should throw error if connection fails', async () => {
		try {
			await MongoDatabase.connect({
				dbName: 'wrong',
				mongoUrl: 'wrong',
			});
		} catch (error) {
			expect(`${error}`).toContain('Invalid scheme');
		}
	});
});
