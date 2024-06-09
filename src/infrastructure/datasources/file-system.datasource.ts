import fs from 'fs';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity } from '../../domain/entities/log.entity';

export class FileSystemDatasource implements LogDataSource {
	private readonly logPath = 'logs/';
	private readonly lowLogsPath = `${this.logPath}low-logs.json`;
	private readonly mediuLogsPath = `${this.logPath}mediumm-logs.json`;
	private readonly highLogsPath = `${this.logPath}high-logs.json`;

	constructor() {
		this.createLogsFiles();
		console.log('FileSystemDatasource instance created');
	}

	private createLogsFiles = async () => {
		if (!fs.existsSync(this.logPath)) {
			console.log('Creating log files');
			fs.mkdirSync(this.logPath);
		}

		[this.lowLogsPath, this.mediuLogsPath, this.highLogsPath].forEach((path) => {
			if (!fs.existsSync(path)) {
				fs.writeFileSync(path, '', 'utf-8');
			}
		});
	};

	async saveLog(log: any): Promise<void> {
		console.log('Saving log to file system:', log);
	}

	async getLogs(severityLevel: any): Promise<LogEntity[]> {
		console.log('Getting logs from file system:', severityLevel);
		return [];
	}
}
