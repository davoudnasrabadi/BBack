import uaParser from 'ua-parser-js';
import { createHash } from 'crypto';
import base64url from 'base64url';
import { nanoid } from 'nanoid';
import { setBigmomentJwt } from './httpHelpers';
import { creatNewUserSession, creatBigmomentAuthTokens } from '../lib/security';
export const getBigmomentToken = (hostname: string, dev: 'ip' | 'local' = 'ip'): string => {
	const { NODE_ENV, PORT } = process.env;
	return NODE_ENV == 'development'
		? `${dev == 'ip' ? 'http://127.0.0.1' : 'http://localhost'}:${PORT}`
		: `https://${hostname}`;
};

export const handleBigmomentTokens = async (
	res: Response,
	user_id: number,
	role: string,
	userAgent: string,
	ip: string,
) => {
	const { ACCESS_TOKEN_AGE_HOUR, REFRESH_TOKEN_AGE_DAY } = process.env;

	// create refresh_token , access_token and jwtid
	const { access_token, jwtid, refresh_token } = creatBigmomentAuthTokens(user_id,"user");

	// create new active session with device data
	if(refresh_token)
	 await creatNewUserSession(user_id, userAgent, refresh_token, ip);

	// set tokens in cookie
	if(REFRESH_TOKEN_AGE_DAY)
	setBigmomentJwt(res, refresh_token, access_token, {
		refresh_token_expiray_day: parseInt(REFRESH_TOKEN_AGE_DAY),
	});
};


export const getFutureDate = (minute: number = 30): Date => {
	return new Date(new Date().setMinutes(new Date().getMinutes() + minute));
};

export const isDateExpired = (date: Date): boolean => {
	if (date < new Date()) return false;
	return true;
};


export const getDeviceData = (agent: string) => {
	const ua = uaParser(agent);
	let data = {
		browser_name: ua.browser.name,
		browser_ver: ua.browser.version,
		cpu: ua.cpu.architecture,
		device_model: ua.device.model,
		device_type: ua.device.type,
		device_vendor: ua.device.vendor,
		os_name: ua.os.name,
		os_ver: ua.os.version,
	};
	return data;
};

export const getUserAgent = (req: any) => {
	return req.get('user-agent');
};

export const getIP = (req: any): string => {
	return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
};

export const createFingerprint = (input: string): string => {
	let hash = createHash('sha256').update(input).digest('base64');
	return base64url.fromBase64(hash);
};

export const createCodeChallenge = (code_verifier: string): string => {
	let hash = createHash('sha256').update(code_verifier).digest('base64');
	return base64url.fromBase64(hash);
};

export const createJti = (): string => {
	return nanoid(32);
};

interface Change {
	oldValue: any;
	newValue: any;
}
interface ObjectComparison {
	added: {};
	updated: {
		[propName: string]: Change;
	};
	removed: {};
	unchanged: {};
}
export const objectDiff = (o1: any, o2: any, deep = false): ObjectComparison => {
	const added: any = {};
	const updated: any = {};
	const removed: any = {};
	const unchanged: any = {};
	for (const prop in o1) {
		if (o1.hasOwnProperty(prop)) {
			const o2PropValue = o2[prop];
			const o1PropValue = o1[prop];
			if (o2.hasOwnProperty(prop)) {
				if (o2PropValue === o1PropValue) {
					unchanged[prop] = o1PropValue;
				} else {
					updated[prop] =
						deep && isObject(o1PropValue) && isObject(o2PropValue)
							? objectDiff(o1PropValue, o2PropValue, deep)
							: { newValue: o2PropValue };
				}
			} else {
				removed[prop] = o1PropValue;
			}
		}
	}
	for (const prop in o2) {
		if (o2.hasOwnProperty(prop)) {
			const o1PropValue = o1[prop];
			const o2PropValue = o2[prop];
			if (o1.hasOwnProperty(prop)) {
				if (o1PropValue !== o2PropValue) {
					if (!deep || !isObject(o1PropValue)) {
						updated[prop].oldValue = o1PropValue;
					}
				}
			} else {
				added[prop] = o2PropValue;
			}
		}
	}
	return { added, updated, removed, unchanged };
};

/**
 * @return if obj is an Object, including an Array.
 */
const isObject = (obj: any) => {
	return obj !== null && typeof obj === 'object';
};

export const convertDateToDbDate = (date: Date): string => {
	return date.toJSON().slice(0, 19).replace('T', ' ');
};
