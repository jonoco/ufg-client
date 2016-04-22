import { SUBMIT_REQUEST, SUBMIT_SUCCESS, SUBMIT_FAILURE } from '../actions/types';

const initialState = {
	isAccessing: false,
	error: null
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SUBMIT_REQUEST:
			return Object.assign({}, state, { isAccessing: true });
		case SUBMIT_SUCCESS:
			return Object.assign({}, state, { isAccessing: false, error: null });
		case SUBMIT_FAILURE:
			return Object.assign({}, state, { isAccessing: false, error: action.error });
	}

	return state;
}