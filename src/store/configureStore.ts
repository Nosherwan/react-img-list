import { createStore, applyMiddleware, compose, Store } from 'redux';
import { appReducer } from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import { history } from '../navigation/history';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash.throttle';
import promiseMiddleware from 'redux-promise-middleware';

// These TS definitions extend the Window interface to enable using
// the custom property for Redux DevTools
// tslint:disable-next-line
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
declare const window: Window

interface Module {
	hot: any
}
declare const module: Module

/**
 * configures the store before creation and after creation
 * returns the same store every time
 * @export
 * @returns store: redux store object
 */
export function configureStore(): Store<any> {
	const persistedState = loadState();
	// Build middleware for intercepting & dispatching navigation actions
	const routMiddleware = routerMiddleware(history);
	const middleware = [
		routMiddleware,
		thunk,
		promiseMiddleware()
	];

	const composeEnhancers = typeof window === 'object' &&
		process.env.NODE_ENV === 'development' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
		compose;

	const enhancer = composeEnhancers(
		applyMiddleware(...middleware),
	);

	const store = createStore(
		appReducer,
		persistedState,
		enhancer
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers').default;

			store.replaceReducer(nextReducer);
		});
	}

	store.subscribe(throttle(() => {
		saveState(store.getState());
	}, 1000));

	return store;
}
