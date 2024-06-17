import { PrismaClient } from '@prisma/client';
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
	const prisma = new PrismaClient();

	// const newLog = await prisma.logModel.create({
	// 	data: {
	// 		message: 'Test prisma log',
	// 		level: 'MEDIUM',
	// 		origin: 'app.ts',
	// 	},
	// });
	// const logs = await prisma.logModel.findMany({
	// 	where: {
	// 		level: 'MEDIUM',
	// 	},
	// });

	Server.start();
}
