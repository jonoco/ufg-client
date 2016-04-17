import { SIGNUP, LOGIN } from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case SIGNUP:
			return {...state, action.payload};
		case LOGIN:
			return {...state, action.payload};
	}

	return state;
}