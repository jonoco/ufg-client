import {
	SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
	LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
	LOG_OUT,
	ITEMS_REQUEST, ITEMS_SUCCESS, ITEMS_FAILURE
} from './types';

import { api } from '../services/api';

// Async actions emit type arrays initially to provide
// proper response types for the promise rectifier
export const signup = (user) => {
	const req = api.post('/signup', user);

	return {
		type: [ SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE ],
		payload: req
	};
}

export const login = (user) => {
	const req = api.post('/signin', user);

	return {
		type: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ],
		payload: req
	};
}

export const logout = () => {
	return {
		type: LOG_OUT
	};
}

export const getItems = (token) => {
	const req = api.request({
		url: '/item',
		headers: { 'authorization': token }
	});

	return {
		type: [ ITEMS_REQUEST, ITEMS_SUCCESS, ITEMS_FAILURE ],
		payload: req
	};
}

