/** using version without ejecting and *.module.css */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

//const store = createStore(reducer);// w/o async redux code
//basic setup vvvv w/o using middleware
//const store = createStore(burgerBuilderReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//environment variables are PROJECT SPECIFIC, and can be
//	set on the config folder env.js on ejected projects
//docs on that: 
//https://create-react-app.dev/docs/adding-custom-environment-variables/
//specifically:
//https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env
/* 
const composeEnhancers = proccess.env.NODE_ENV === 'development' ?
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose; 
*/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk)
));

const app = (
	<React.StrictMode>{/* <--idk what this is for */}
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
//added by react vvvvvvv
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
