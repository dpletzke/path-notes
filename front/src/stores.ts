import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { User, Path } from './types';

const initialValue = browser ? window.sessionStorage.getItem('accessToken') : null;

export const accessToken = writable<string | null>(initialValue);

accessToken.subscribe((value) => {
	if (browser && value !== null) {
		window.sessionStorage.setItem('accessToken', value);
	}
	if (browser && value === null) {
		window.sessionStorage.removeItem('accessToken');
	}
});

export const user = writable<null | User>(null);
export const paths = writable([] as Path[]);
