import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { search } from './search';

const appReducer = combineReducers({
	search,
	router: routerReducer
});

export { appReducer };
