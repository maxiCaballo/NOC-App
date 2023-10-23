import { EmailService } from '../../../presentation/email/email.service';
import { Log, LogSeverityLevel } from '../../models/log.model';
import { LogRepository } from '../../repository/log.repository';
interface SendLogEmailUseCase {
	execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
	constructor(private readonly emailService: EmailService, private readonly logRepository: LogRepository) {}

	async execute(to: string | string[]) {
		try {
			const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

			if (!sent) {
				throw new Error('There was an error sendig the email...');
			}

			const log = new Log({
				level: LogSeverityLevel.low,
				message: `Email was sent succesfully`,
				origin: 'send-email-logs.ts',
			});
			this.logRepository.saveLog(log);

			return true;
		} catch (error) {
			const log = new Log({
				level: LogSeverityLevel.high,
				message: `Email not sent - Error: ${error}`,
				origin: 'send-email-logs.ts',
			});
			this.logRepository.saveLog(log);
			return false;
		}
	}
}
