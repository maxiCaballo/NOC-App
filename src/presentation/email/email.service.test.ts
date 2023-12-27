import { EmailService, SendEmailOptions } from './email.service';
import nodemailer from 'nodemailer';

describe('email.service.ts', () => {
	const mockSendEmail = jest.fn();

	//Mock createTransport
	nodemailer.createTransport = jest.fn().mockReturnValue({
		sendEmail: mockSendEmail,
	});

	test('should send email', async () => {
		const emailService = new EmailService();

		const options: SendEmailOptions = {
			to: 'caballomaxi@gmail.com',
			subject: 'Test',
			htmlBody: '<h1>Test</h1>',
		};

		await emailService.sendEmail(options);

		expect(mockSendEmail).toHaveBeenCalledWith();
	});
});
