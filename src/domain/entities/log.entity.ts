export enum LogSeverityLevel {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
}

export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;

	constructor(message: string, level: LogSeverityLevel, createdAt: Date) {
		this.level = level;
		this.message = message;
		this.createdAt = new Date();
	}
}
