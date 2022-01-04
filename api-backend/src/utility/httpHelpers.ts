import { IFormResponse, IErrorForm, IErrors } from '../../../shared-models';
import { Response } from 'express';
import { validationResult } from 'express-validator';
import { IPaginationRes } from '../../../shared-models';
import normalUrl from 'normalize-url';
import { isGeneratorFunction } from 'util/types';

/**
 * response a request with success and Data
 */
export const respSuccess = <T>(data: T, res: Response, code: number = 200): Response => {
	let resp: IFormResponse = { success: true, data: data ? data : {}, timestamp: Date.now() };
	return res.status(code).send(resp);
};

// response a request with Unsuccess and err message
export const respUnsuccess = (errMessage: IErrorForm[] | null, res: Response, code: number): Response => {
	let resp: IFormResponse = { success: false, error: errMessage, timestamp: Date.now() };
	return res.status(code).send(resp);
};

export const respUnauthorized = (res: Response, clearCookie: boolean, message = 'unauthorized') => {
	if (clearCookie) clearTokenCookies(res);
	return respUnsuccess([{ msg: message, key: IErrors.UNAUTHORIZED }], res, 401);
};

export const respForbidden = (res: Response, message = 'access forbidden') => {
	return respUnsuccess([{ msg: message, key: IErrors.FORBIDDEN_ACCESS }], res, 403);
};

export const validateRequest = (req: any): null | IErrorForm[] => {
	let errors = validationResult(req);
	if (errors.isEmpty()) return null;
	let reqErrors: IErrorForm[] = [];
	for (const item of errors.array()) {
		let isExist =
			item.msg == 'Invalid value'
				? reqErrors.find((i) => i.msg == `${item.param} ${item.msg}`)
				: reqErrors.find((i) => i.msg == item.msg);

		if (!isExist) reqErrors.push({ msg: item.msg == 'Invalid value' ? `${item.param} ${item.msg}` : item.msg });
	}
	return reqErrors;
};

interface ISetUniclientJwtOpts {
	refresh_token_expiray_day: number;
}
export const setBigmomentJwt = (
	res: any,
	refresh_token: string | undefined,
	access_token: string | undefined,
	options: ISetUniclientJwtOpts,
) => {
	 if(refresh_token && access_token){
	setRefreshTokenInCookie(res, refresh_token, options);
	setAccessTokenInCookie(res, access_token);
	 }
};

export const setAccessTokenInCookie = (res: Response, access_token: string) => {
	res.cookie('access_token', access_token, {
		httpOnly: true,
		maxAge: 365 * 24 * 60 * 60 * 1000,
	});
};

export const setRefreshTokenInCookie = (res: Response, refresh_token: string, options: ISetUniclientJwtOpts) => {
	res.cookie('refresh_token', refresh_token, {
		httpOnly: true,
		maxAge: options.refresh_token_expiray_day * 24 * 60 * 60 * 1000,
	});
};

export const setJWTcookie = (res: Response, token: string) => {
	res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
};

export const clearTokenCookies = (res: Response) => {
	res.clearCookie('refresh_token');
	res.clearCookie('access_token');

	//TODO: Remove Next Line In FUTURE
	res.clearCookie('token');
};

export const makePaginationList = (total: number, page: number, limit: number): IPaginationRes => {
	let totalPages = Math.ceil(total / limit);

	let model: IPaginationRes = {
		totalPages,
		hasNextPage: totalPages > page ? true : false,
		hasPrevPage: page > 1 ? true : false,
		limit,
		page,
		total,
		offset: limit * (page - 1),
	};
	return model;
};

export const normalizingUrl = (url: string) => {
	return normalUrl(url);
};
