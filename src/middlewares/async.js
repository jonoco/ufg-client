import _ from 'lodash';

export default function({ dispatch }) {
	return next => action => {
		
		if (!action.payload) {
			return next(action);
		}

		const typeIsArray = _.isArray(action.type);
		
		// if action is a type array -> send the request through
		// in case other middleware is interested
		if (typeIsArray) {
			const [ REQUEST, SUCCESS, FAILURE ] = action.type;
			const newAction = {...action, type: REQUEST };
			dispatch(newAction); 
		}

		// deconstruct action.type and wait for a response to determine success or failure
		if (action.payload.then && typeIsArray) {
			const [ REQUEST, SUCCESS, FAILURE ] = action.type;

			action.payload
				.then(response => {
					const newAction = { type: SUCCESS, payload: response.data };
					dispatch(newAction);
				})
				.catch(error => {
					const newAction = { type: FAILURE, payload: error.data };
					dispatch(newAction);
				});
		}

		return next(action);
	};
}