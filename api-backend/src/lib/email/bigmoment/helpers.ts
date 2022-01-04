import nodemailer from 'nodemailer';
import { emailConfig } from '../../../utility/config/emailAccount';
import Mail from 'nodemailer/lib/mailer';
import { IEmailCauseUniconsole } from '../../../../../shared-models';
export const returnEmailDescription = (cause: IEmailCauseUniconsole): string => {
	switch (cause) {
		case 'login':
			return 'Use this code to login';
		case 'forgot':
			return 'Use this code to rest your password';
		case 'signUp':
			return 'Use this code to sign up';
		case 'changeEmail':
			return 'Use this code to change your email';
		case 'changePassword':
			return 'Use this code to change your password';
		default:
			return 'Use this code where you started your process.';
	}
};

export const returnEmailTitle = (cause: IEmailCauseUniconsole): string => {
	switch (cause) {
		case 'login':
			return 'Your login code';
		case 'forgot':
			return 'Forgot password';
		case 'signUp':
			return "Let's create your account";
		case 'changeEmail':
			return "Let's change your email";
		case 'changePassword':
			return "Let's change your password";
		default:
			return 'Your code has been resent';
	}
};

export const createEmailTransporter = (): Mail => {
	const transporter = nodemailer.createTransport({
		...emailConfig.smtp,
		auth: {
			user: emailConfig.user,
			pass: emailConfig.pass,
		},
	});
	return transporter;
};
