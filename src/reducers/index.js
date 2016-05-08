import { combineReducers } from 'redux';
import user from './user';
import item from './item';
import submit from './submit';
import users from './users';
import message from './message';
import { reducer as reduxForm } from 'redux-form';

const rootReducer = combineReducers({
  user,
  item,
  submission: submit,
  users,
  message,
  form: reduxForm
});

export default rootReducer;
