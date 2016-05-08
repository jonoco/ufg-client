import {
	SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
	LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
	LOG_OUT,
	ITEMS_REQUEST, ITEMS_SUCCESS, ITEMS_FAILURE,
	SUBMIT_REQUEST, SUBMIT_SUCCESS, SUBMIT_FAILURE,
	USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE
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

/*
	taken: bool (false) 		select taken items 				
	friends: bool (false)		select items from friends, otherwise user 
 */
export const getItems = (token, options) => {
	const req = api.request({
		url: '/item',
		headers: { 'authorization': token },
		data: options
	});

	return {
		type: [ ITEMS_REQUEST, ITEMS_SUCCESS, ITEMS_FAILURE ],
		payload: req
	};
}

import { DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE } from '../actions/types';
export const deleteItem = (token, item) => {
	const req = api.request({
		url: '/item',
		method: 'delete',
		headers: { 'authorization': token },
		data: item
	});

	return {
		type: [ DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE ],
		payload: req
	};
}

export const submit = (token, id) => {
	const req = api.request({
		url: '/item',
		method: 'post',
		headers: { 'authorization': token },
		data: id
	});

	return {
		type: [ SUBMIT_REQUEST, SUBMIT_SUCCESS, SUBMIT_FAILURE ],
		payload: req
	};
}

export const getUsers = (token) => {
	const req = api.request({
		url: '/user',
		method: 'get',
		headers: { 'authorization': token }
	});

	return {
		type: [ USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE ],
		payload: req
	};
}

import { ADD_FRIEND_REQUEST, ADD_FRIEND_SUCCESS, ADD_FRIEND_FAILURE } from '../actions/types';
export const addFriend = (token, friend) => {
	const req = api.request({
		url: '/user/friend',
		method: 'put',
		headers: { 'authorization': token },
		data: { friend: friend, addFriend: true }
	});

	return {
		type: [ ADD_FRIEND_REQUEST, ADD_FRIEND_SUCCESS, ADD_FRIEND_FAILURE ],
		payload: req
	};
}

import { REMOVE_FRIEND_REQUEST, REMOVE_FRIEND_SUCCESS, REMOVE_FRIEND_FAILURE } from '../actions/types';
export const removeFriend = (token, friend) => {
	const req = api.request({
		url: '/user/friend',
		method: 'put',
		headers: { 'authorization': token },
		data: { friend: friend, addFriend: false }
	});

	return {
		type: [ REMOVE_FRIEND_REQUEST, REMOVE_FRIEND_SUCCESS, REMOVE_FRIEND_FAILURE ],
		payload: req
	};
}

import { GET_MESSAGE_REQUEST, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAILURE } from '../actions/types';
export const getMessages = (token) => {
	const req = api.request({
		url:'/message',
		method: 'get',
		headers: { 'authorization': token }
	});

	return {
		type: [ GET_MESSAGE_REQUEST, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAILURE ],
		payload: req
	};
}

import { SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE } from '../actions/types';
export const sendMessage = (token, message) => {
	const req = api .request({
		url: '/message',
		method: 'post',
		headers: { 'authorization': token },
		data: { ...message, time: new Date().getTime() }
	});

	return {
		type: [ SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE ],
		payload: req
	};
}
