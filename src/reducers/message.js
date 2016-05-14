import { 
	GET_MESSAGE_REQUEST, GET_MESSAGE_SUCCESS, GET_MESSAGE_FAILURE,
	SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE
} from '../actions/types';

import _ from 'lodash';

const initialState = {
	isAccessing: false,
	messages: [],
	error: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_MESSAGE_REQUEST:
			return Object.assign({}, state, { isAccessing: true });
		case GET_MESSAGE_SUCCESS:
			return Object.assign({}, state, {
				isAccessing: false,
				messages: action.payload.messages,
				error: null
			});
		case GET_MESSAGE_FAILURE:
			return Object.assign({}, state, {
				isAccessing: false,
				error: action.error
			});

		case SEND_MESSAGE_REQUEST:
			return Object.assign({}, state, { isAccessing: true });
		case SEND_MESSAGE_SUCCESS:
			return Object.assign({}, state, {
				isAccessing: false,
				messages: [...state.messages, action.payload.message],
				error: null
			});
		case SEND_MESSAGE_FAILURE:
			return Object.assign({}, state, {
				isAccessing: false,
				error: action.error
			});
	}

	return state;
}