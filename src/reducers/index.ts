import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { company } from './company';
import { portfolio } from './portfolio';
import { search } from './search';

const appReducer = combineReducers({
	portfolio,
	company,
	search,
	router: routerReducer
});

export { appReducer };
