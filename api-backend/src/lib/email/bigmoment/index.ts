import { logError } from '../../../lib/sentry';
import { IEmailCauseUniconsole } from '../../../../../shared-models';
import { createEmailTransporter, returnEmailTitle, returnEmailDescription } from './helpers';
import { generateOTPEmail } from './templates/generateOTPEmail';
import { generateSignUpEmail } from './templates/generateSignUpEmail';

export const sendOTPEmail = async (email: string, otp: string, cause: IEmailCauseUniconsole) => {
	try {
		const transporter = createEmailTransporter();
		const title = returnEmailTitle(cause);
		const desc = returnEmailDescription(cause);
		const info = await transporter.sendMail({
			from: 'noreply@uniplato.com',
			to: email,
			subject: returnEmailTitle(cause),
			text: returnEmailDescription(cause),
			html: generateOTPEmail(title, desc, otp),
		});
		return info;
	} catch (err) {
		logError(err);
	}
};

export const sendSignUpEmail = async (email: string) => {
	const transporter = createEmailTransporter();
	const info = await transporter.sendMail({
		from: 'noreply@uniplato.com',
		to: email,
		subject: 'Welcome to UniPlato',
		text: 'Your account is successfully created, now you can use Uniconsole APIs or make a white label Uniclient.',
		html: generateSignUpEmail(),
	});
	return info;
};
