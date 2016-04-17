import {
	SIGNUP
} from './types';

function signup(user) {
	return {
		type: SIGNUP,
		payload: user
	};
}

export { signup };