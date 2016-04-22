import { combineReducers } from 'redux';
import user from './user';
import item from './item';
import submit from './submit';

const rootReducer = combineReducers({
  user,
  item,
  submission: submit
});

export default rootReducer;
