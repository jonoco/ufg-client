import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import App from './components/app';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
			<Route path='/' component={App}>
				<IndexRoute component={Home} />
				<Route path='login' component={Login}/>
				<Route path='signup' component={Signup} />
			</Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
