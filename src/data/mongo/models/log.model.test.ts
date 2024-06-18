import { envs } from '../../../config/plugins/envs.plugin';
import { MongoDatabase } from '../init';
import { LogModel } from './log.model';

const logData = {
	message: 'test',
	origin: 'test',
	level: 'low',
	createdAt: new Date(),
};

describe('Log Model tests', () => {
	beforeAll(async () => {
		await MongoDatabase.connect({
			mongoUrl: envs.MONGO_URL,
			dbName: envs.MONGO_DB_NAME,
		});
	});

	afterAll(async () => {
		await MongoDatabase.disconnect();
	});

	test('should return LogModel', async () => {
		const log = await LogModel.create(logData);

		expect(log).toEqual(
			expect.objectContaining({
				...logData,
			})
		);

		await LogModel.findByIdAndDelete(log._id);
	});

	test('should return the schmea object', () => {
		const schema = LogModel.schema.obj;

		expect(schema).toEqual(
			expect.objectContaining({
				message: {
					type: String,
					required: true,
				},
				origin: {
					type: String,
					default: 'undefined',
				},
				level: {
					type: String,
					enum: ['low', 'medium', 'high'],
					default: 'low',
				},
				createdAt: {
					type: Date,
					default: expect.any(Date),
				},
			})
		);
	});
});
