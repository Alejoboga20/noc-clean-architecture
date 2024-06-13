import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions {
	to: string;
	subject: string;
	htmlBody: string;
	// attachments: any[];
}

export class EmailService {
	private transporter = nodemailer.createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_MAIL,
			pass: envs.MAILER_SECRET_KEY,
		},
	});

	async sendMail(options: SendMailOptions): Promise<boolean> {
		const { to, subject, htmlBody } = options;
		try {
			const sentInformation = await this.transporter.sendMail({
				to,
				subject,
				html: htmlBody,
				from: envs.MAILER_MAIL,
			});

			console.log({ sentInformation });
			return true;
		} catch (error) {
			return false;
		}
	}
}
