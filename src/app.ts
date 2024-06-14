import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

(async () => {
	await main();
})();

async function main() {
	await MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME,
	});

	// const newLog = await LogModel.create({
	// 	message: 'Server started!',
	// 	level: 'low',
	// });
	// await newLog.save();
	// const logs = await LogModel.find();

	Server.start();
}
