import { 
	SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOG_OUT,
  ADD_FRIEND_REQUEST, ADD_FRIEND_SUCCESS, ADD_FRIEND_FAILURE,
  REMOVE_FRIEND_REQUEST, REMOVE_FRIEND_SUCCESS, REMOVE_FRIEND_FAILURE  
} from '../actions/types';

import _ from 'lodash';

const initialState = {
	token: null,
	username: null,
	id: null,
	error: null,
	isAccessing: false,
	onSince: null,
	friends: []
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
				id: action.payload.id,
				onSince: new Date().getTime(),
				error: null
			});
		case SIGNUP_FAILURE:
			return Object.assign({}, state, {
				isAccessing: false,
				error: action.error
			});

		case LOGIN_REQUEST:
			return Object.assign({}, state, { isAccessing: true });
		case LOGIN_SUCCESS:
			return Object.assign({}, state, { 
				isAccessing: false,
				token: action.payload.token,
				username: action.payload.username,
				id: action.payload.id,
				onSince: new Date().getTime(),
				error: null,
				friends: action.payload.friends
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, {
				isAccessing: false,
				error: action.error
			});
		
		case ADD_FRIEND_REQUEST:
			return Object.assign({}, state, { isAccessing: true });
		case ADD_FRIEND_SUCCESS:
			return Object.assign({}, state, { 
				isAccessing: false,
				error: null,
				friends: [...state.friends, action.payload.friend]
			});
		case ADD_FRIEND_FAILURE:
			return Object.assign({}, state, {
				isAccessing: false,
				error: action.error
			});

		case REMOVE_FRIEND_REQUEST:
			return Object.assign({}, state, { isAccessing: true });
		case REMOVE_FRIEND_SUCCESS:
			return Object.assign({}, state, { 
				isAccessing: false,
				error: null,
				friends: _.without(state.friends, action.payload.friend)
			});
		case REMOVE_FRIEND_FAILURE:
			return Object.assign({}, state, {
				isAccessing: false,
				error: action.error
			});

		case LOG_OUT:
			return initialState;
	}

	return state;
}