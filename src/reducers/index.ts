import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { search } from './search';
import { ui } from './ui';

const appReducer = combineReducers({
	ui,
	search,
	router: routerReducer
});

export { appReducer };
