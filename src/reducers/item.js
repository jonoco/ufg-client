import { ITEMS_REQUEST, ITEMS_SUCCESS, ITEMS_FAILURE } from '../actions/types';

var initialState = {
	isAccessing: false,
	items: [],
	error: null,
	success: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ITEMS_REQUEST:
			return Object.assign({}, state, { isAccessing: true });
		case ITEMS_SUCCESS:
			return Object.assign({}, state, { 
				isAccessing: false, 
				items: action.payload.items,
				error: null,
				success: true
			});
		case ITEMS_FAILURE:
			return Object.assign({}, state, { 
				isAccessing: false,
				error: action.error,
				success: false
			});
	}

	return state;
}