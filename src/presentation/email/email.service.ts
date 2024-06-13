import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

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

			return true;
		} catch (error) {
			return false;
		}
	}

	async sendEmailWithFileSystemLogs(to: string | string[]) {
		const sentInformation = await this.sendMail({
			to,
			subject: SUBJECT,
			htmlBody: HTML_BODY,
			attachments: ATTACHMENTS,
		});

		return sentInformation;
	}
}
