import 'dotenv/config';
import { envs } from '../../config/plugins/envs.plugin';
import nodemailer from 'nodemailer';
import { Log, LogSeverityLevel } from '../../domain/models/log.model';

interface SendEmailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachments[];
}
interface Attachments {
	filename: string;
	path: string;
}

export class EmailService {
	private transporter = nodemailer.createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY,
		},
	});

	constructor() {}

	async sendEmail(options: SendEmailOptions): Promise<boolean> {
		const { to, subject, htmlBody, attachments = [] } = options;

		try {
			const sentInfo = await this.transporter.sendMail({
				to,
				subject,
				html: htmlBody,
				attachments,
			});

			// console.log({ sentInfo });

			return true;
		} catch (error) {
			return false;
		}
	}

	sendEmailWithFileSystemLogs(to: string | string[]) {
		const subject = 'Logs from the server';
		const htmlBody = `<h3>Enviando un email desde la aplicacion NOC</h3>`;
		const attachments: Attachments[] = [
			{
				filename: 'logs-all.log',
				path: './logs/logs-all.log',
			},
			{
				filename: 'logs-medium.log',
				path: './logs/logs-medium.log',
			},
			{
				filename: 'logs-high.log',
				path: './logs/logs-high.log',
			},
		];
		return this.sendEmail({
			to,
			subject,
			htmlBody,
			attachments,
		});
	}
}
