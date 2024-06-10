export enum LogSeverityLevel {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
}

export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;

	constructor(message: string, level: LogSeverityLevel, createdAt?: Date) {
		this.level = level;
		this.message = message;
		this.createdAt = new Date();
	}

	static fromJson(json: string): LogEntity {
		const { message, level, createdAt } = JSON.parse(json);
		/* Include validations here, we can use zod */
		const logEntity = new LogEntity(message, level, new Date(createdAt));

		return logEntity;
	}
}
