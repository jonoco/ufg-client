import { USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE } from '../actions/types';

const initialState = {
	isAccessing: false,
	users: [],
	error: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case USERS_REQUEST:
			return Object.assign({}, state, { isAccessing: true });
		case USERS_SUCCESS:
			return Object.assign({}, state, { 
				isAccessing: false, 
				users: action.payload.users, 
				error: null 
			});
		case USERS_FAILURE:
			return Object.assign({}, state, { 
				isAccessing: false, 
				error: action.error 
			});
	}

	return state;
}