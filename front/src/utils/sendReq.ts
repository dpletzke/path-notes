import { type ErrorResponse, type SuccessResponse, type Range, isSuccess } from '../types';

type configArgs = {
	url: string;
	payload?: { [key: string]: unknown };
	accessToken?: string;
	params?: { [key: string]: unknown };
};

export const sendReq = async <T>(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	{ url = '', payload, accessToken = '', params = {} }: configArgs
) => {
	const urlInst = new URL(url);

	const headers = {
		'Content-Type': 'application/json',
		Authorization: accessToken ? `Bearer ${accessToken}` : undefined
	};

	const body = method !== 'GET' && payload ? JSON.stringify(payload) : undefined;

	const config = {
		method, // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		headers,
		body // body data type must match "Content-Type" header
	} as RequestInit;

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			urlInst.searchParams.append(key, JSON.stringify(value));
		});
	}

	const response = await fetch(urlInst.toString(), config);
	return response.json().then((data) => {
		const result = { code: response.status, body: data };
		if (isSuccess<T>(result)) {
			return result as SuccessResponse<T>;
		}
		return result as ErrorResponse;
	});
};
