import { ActionTypes } from '../constants';
import { Map, fromJS } from 'immutable';


// function _addCompanyToHoldings (state, payload) {
// 	const holdings = state.getIn(['current', 'portfolio', 'holdings', 'data']);
// 	const updatedHoldings = holdings.unshift(fromJS(payload.company.data));

// 	return state.withMutations(state => {
// 		state.set('loading', false);
// 		state.set('reload', true);
// 		state.setIn(['current', 'portfolio', 'holdings', 'data'], updatedHoldings);
// 	});
// }

// function _removeCompanyFromHoldings (state, payload) {
// 	const holdings = state.getIn(['current', 'portfolio', 'holdings', 'data']);
// 	const companyIndex = holdings.findIndex(item => item.get('unique_symbol') === payload.uniqueSymbol);
// 	const updatedHoldings = holdings.delete(companyIndex);

// 	return state.withMutations(state => {
// 		state.set('loading', false);
// 		state.set('reload', true);
// 		state.setIn(['current', 'portfolio', 'holdings', 'data'], updatedHoldings);
// 	});
// }

export function portfolio (state = Map({
	reload: false,
	message: '',
	loading: false,
	current: Map({}),
	sidebarOpen: false,
	appLevelError: false
}), action: any) {

	switch (action.type) {
		case ActionTypes.SHARE_ADD:
			return state.set('loading', false);
		default:
			return state;
	}
}
