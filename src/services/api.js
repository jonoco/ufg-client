import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:3090',
	timeout: 10000,
});