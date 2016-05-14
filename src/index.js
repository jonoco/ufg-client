import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';

import App from './components/app';
import Home from './containers/home';
import Login from './containers/login';
import Signup from './containers/signup';
import User from './containers/user';
import Submit from './containers/submit';
import Friends from './containers/friends';
import Items from './containers/items';
import Notification from './containers/notifications';
import ItemDetail from './containers/item-detail';

import RequireAuth from './containers/require-auth';

import reducers from './reducers';
import Async from './middlewares/async';

const logger = createLogger();

// Tie the Redux store into local storage
const createPersistentStore = compose(
	persistState(null, { key: 'ufg' })
)(createStore);

// Tie the middleware together with the store
const createStoreWithMiddleware = applyMiddleware(
	Async, 
	logger
)(createPersistentStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
			<Route name='home' path='/' component={App}>
				<IndexRoute component={Home} />
				<Route name='login' path='login' component={Login} />
				<Route name='signup' path='signup' component={Signup} />
				<Route name='user' path='user' component={RequireAuth(User)} />
				<Route name='submit' path='submit' component={RequireAuth(Submit)} />
				<Route name='friends' path='friends' component={RequireAuth(Friends)} />
				<Route name='items' path='items' component={RequireAuth(Items)} />
				<Route path='items/:itemID' component={RequireAuth(ItemDetail)} />
				<Route name='notifications' path='notifications' component={RequireAuth(Notification)} />
			</Route>
    </Router>
  </Provider>
  , document.querySelector('.app'));
