import { ActionTypes } from '../constants';
import { Map, fromJS } from 'immutable';

function lookup(term: any, results: any) {
	if (term === '') return fromJS([])

	return results.filter((item: any) => {
		let symbol = item.get('symbol')
		return symbol.toLowerCase().indexOf(term) > -1
	})
}

export function search(state = Map({
	show: false,
	loading: false,
	results: [],
	subset: [],
	selection: Map({})
}), action: any) {
	switch (action.type) {
		case ActionTypes.COMPANY_SEARCH:
			console.log('action', action)
			const results = state.get('results');
			const subset = lookup(action.payload, results);
			return state.set('subset', subset);
		case ActionTypes.SYMBOL_FETCH + '_FULFILLED':
			return state.withMutations(state => {
				state.set('results', fromJS(action.payload));
			});
		case ActionTypes.COMPANY_SEARCH:
			return state.withMutations(state => {
				state.set('loading', false);
				state.set('results', fromJS([]));
			});
		case ActionTypes.COMPANY_SEARCH:
			return state.set('selection', Map({}));
		default:
			return state;
	}
}
