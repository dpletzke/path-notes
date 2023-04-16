import { isBetween } from './utils/num';

export type Path = {
	name: string;
	description: string;
	userId: string;
	photos: string[];
	coverPhoto: string;
	elevationGain: number;
	elevationLoss: number;
	elevationMin: number;
	elevationMax: number;
	distance: number;
	duration: number;
	difficulty: string;
	routeType: string;
};

export type User = {
	id: string;
	email: string;
	name: string;
	profilePhoto: string | null;
	paths: string[] | [];
};

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

interface ApiResponse {
	code: number;
	body: unknown;
}

export interface ErrorResponse extends ApiResponse {
	code: Range<300, 599>;
	body: {
		error: string;
		message: string;
		statusCode: Range<300, 599>;
	};
}

export interface SuccessResponse<T> extends ApiResponse {
	code: Range<200, 299>;
	body: T;
}

export const isSuccess = <T>(res: ApiResponse): res is SuccessResponse<T> => {
	return isBetween(res.code, 200, 299);
};
