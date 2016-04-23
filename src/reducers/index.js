import { combineReducers } from 'redux';
import user from './user';
import item from './item';
import submit from './submit';
import users from './users';

const rootReducer = combineReducers({
  user,
  item,
  submission: submit,
  users
});

export default rootReducer;
