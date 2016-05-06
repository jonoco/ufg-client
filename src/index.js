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

import reducers from './reducers';
import Async from './middlewares/async';

const logger = createLogger();

// Tie the Redux store into local storage
const createPersistentStore = compose(
	persistState()
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
				<Route name='login' path='login' component={Login}/>
				<Route name='signup' path='signup' component={Signup} />
				<Route name='user' path='user' component={User} />
				<Route name='submit' path='submit' component={Submit} />
				<Route name='friends' path='friends' component={Friends} />
				<Route name='items' path='items' component={Items} />
			</Route>
    </Router>
  </Provider>
  , document.querySelector('.app'));
