import { fromJS } from 'immutable';

export const loadState = () => {
	try {
		let	serializedState: any = localStorage.getItem('state');

		if (serializedState === null) {
			return undefined;
		}

		if (typeof serializedState !== 'object') {
			serializedState = JSON.parse(serializedState);
		}

		Object.keys(serializedState).forEach(key => serializedState[key] = fromJS(serializedState[key]));

		return serializedState;
	} catch (err) {
		return undefined;
	}
};

export const saveState = (state: any) => {
	try {
		const deSerializedState = JSON.stringify(state);
		localStorage.setItem('state', deSerializedState);
	} catch (err) {
    console.log('Unable to save to local storage', )
	}
};
