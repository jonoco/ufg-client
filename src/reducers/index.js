import { combineReducers } from 'redux';
import user from './user';
import item from './item';

const rootReducer = combineReducers({
  user,
  item
});

export default rootReducer;
