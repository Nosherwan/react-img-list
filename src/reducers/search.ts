import { ActionTypes } from '../constants';
import { Map, List, fromJS } from 'immutable';

const FULFILLED = '_FULFILLED';

export function search(state = Map({
	count: 0,
	selected: Map({}),
	results: List()
}), action: any) {
	let results: any;
	switch (action.type) {
		case ActionTypes.SET_SELECTED_PHOTO:
			return state.set('selected', action.payload.selected)
		case ActionTypes.PHOTO_FETCH + FULFILLED:
			results = state.get('results');
			return state.withMutations(state => {
				state.set('count', action.payload.count);
				state.set('results', results.concat(fromJS(action.payload.results)));
			});
		default:
			return state;
	}
}
