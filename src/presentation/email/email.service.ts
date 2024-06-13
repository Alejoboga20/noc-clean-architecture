import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachment[];
}

interface Attachment {
	filename: string;
	path: string;
}

const SUBJECT = 'Logs from the file system';
const HTML_BODY = 'Please find the logs attached to this email';

const ATTACHMENTS: Attachment[] = [
	{
		filename: 'high-logs.json',
		path: './logs/high-logs.json',
	},
	{
		filename: 'low-logs.json',
		path: './logs/low-logs.json',
	},
	{
		filename: 'medium-logs.json',
		path: './logs/medium-logs.json',
	},
];

export class EmailService {
	constructor(private readonly logRepository: LogRepository) {}

	private transporter = nodemailer.createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_MAIL,
			pass: envs.MAILER_SECRET_KEY,
		},
	});

	async sendMail(options: SendMailOptions): Promise<boolean> {
		const { to, subject, htmlBody, attachments = [] } = options;

		try {
			const sentInformation = await this.transporter.sendMail({
				to,
				subject,
				html: htmlBody,
				from: envs.MAILER_MAIL,
				attachments,
			});

			const log = new LogEntity({
				level: LogSeverityLevel.LOW,
				message: `Email sent to ${to}`,
				origin: 'EmailService',
			});

			this.logRepository.saveLog(log);
			return true;
		} catch (error) {
			const log = new LogEntity({
				level: LogSeverityLevel.HIGH,
				message: `Email not sent to ${to}`,
				origin: 'EmailService',
			});

			this.logRepository.saveLog(log);
			return false;
		}
	}

	async sendEmailWithFileSystemLogs(to: string | string[]) {
		await this.sendMail({
			to,
			subject: SUBJECT,
			htmlBody: HTML_BODY,
			attachments: ATTACHMENTS,
		});
	}
}
