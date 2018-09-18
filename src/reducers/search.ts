import { ActionTypes } from '../constants';
import { Map, List, fromJS } from 'immutable';

const FULFILLED = '_FULFILLED';

export function search(state = Map({
	count: 0,
	results: List()
}), action: any) {
		let results: any;
	switch (action.type) {
		case ActionTypes.PHOTO_FETCH + FULFILLED:
			console.log('action', action)
			results = state.get('results');
			return state.withMutations(state => {
				state.set('count', action.payload.count);
				state.set('results', results.concat(fromJS(action.payload.results)));
			});
		default:
			return state;
	}
}
