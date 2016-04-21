import { 
	SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOG_OUT 
} from '../actions/types';

const initialState = {
	token: null,
	username: null,
	error: null,
	isAccessing: false,
	onSince: null
};

export default function(state = initialState, action) {

	switch(action.type) {
		case SIGNUP_REQUEST:
			return Object.assign({}, state, { isAccessing: true });
		case SIGNUP_SUCCESS:
			return Object.assign({}, state, { 
				isAccessing: false, 
				token: action.payload.token,
				username: action.payload.username,
				onSince: new Date().getTime(),
				error: null
			});
		case SIGNUP_FAILURE:
			return Object.assign({}, state, {
				isAccessing: false,
				error: action.payload.error
			});

		case LOGIN_REQUEST:
			return Object.assign({}, state, { isAccessing: true });
		case LOGIN_SUCCESS:
			return Object.assign({}, state, { 
				isAccessing: false,
				token: action.payload.token,
				username: action.payload.username,
				onSince: new Date().getTime(),
				error: null
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, {
				isAccessing: false,
				error: action.payload.error
			});

		case LOG_OUT:
			return initialState;
	}

	return state;
}