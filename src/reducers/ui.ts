import { ActionTypes } from '../constants';
import { Map } from 'immutable';

export function ui(state = Map({
	showOverlay: false
}), action: any) {
	switch (action.type) {
		case ActionTypes.SHOW_OVERLAY:
			return state.set('showOverlay', action.payload.show)
		default:
			return state;
	}
}
