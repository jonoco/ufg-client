import { combineReducers } from 'redux';
import authenticationReducer from './authentication';

const rootReducer = combineReducers({
  user: authenticationReducer
});

export default rootReducer;
