import { ActionTypes } from '../constants';
import { Map, fromJS } from 'immutable';

// function _updatePortfolios(state, payload) {
// 	return state.withMutations(state => {
// 		state.update('portfolios', portfolio => portfolio.set(payload.portfolioId, fromJS(payload.portfolioData)));
// 		state.set('loaded', true);
// 	});
// }

export function company(state = Map({
	title: 'Search Results',
	loaded: false,
	portfolios: Map({}),
	portfolioIds: Map({}),
	blackList: Map({}),
}), action: any) {
	switch (action.type) {
		case ActionTypes.SHARE_ADD:
			return state.set('portfolioIds', fromJS(action.payload.portfolios));
		default:
			return state;
	}
}
