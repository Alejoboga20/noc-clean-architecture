export enum LogSeverityLevel {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
}

export interface LogEntityOptions {
	level: LogSeverityLevel;
	message: string;
	createdAt?: Date;
	origin: string;
}

export class LogEntity {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;
	public origin: string;

	constructor(options: LogEntityOptions) {
		const { level, message, origin, createdAt = new Date() } = options;

		this.level = level;
		this.message = message;
		this.createdAt = createdAt;
		this.origin = origin;
	}

	static fromJson(json: string): LogEntity {
		json = json || '{}';
		const { message, level, createdAt, origin } = JSON.parse(json);
		/* Include validations here, we can use zod */
		const logEntity = new LogEntity({ message, level, createdAt, origin });

		return logEntity;
	}

	static fromObject(object: { [key: string]: any }): LogEntity {
		const { message, level, createdAt, origin } = object;
		const logEntity = new LogEntity({ message, level, createdAt, origin });

		return logEntity;
	}
}
