import { ActionTypes } from '../constants';
import { Map, fromJS } from 'immutable';

export function search (state = Map({
	show: false,
	loading: false,
	results: [],
	selection: Map({})
}), action: any) {
	switch (action.type) {
		case ActionTypes.COMPANY_SEARCH:
			return state.set('selection', fromJS(action.payLoad.item));
		case ActionTypes.COMPANY_SEARCH:
			return state.withMutations(state => {
				state.set('loading', false);
				state.set('results', fromJS(action.payLoad));
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
