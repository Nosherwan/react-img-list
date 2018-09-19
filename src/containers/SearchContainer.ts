import { connect } from 'react-redux';
import { Search } from '../components/Search';
import {
	getPhotos,
	setPhoto
} from '../actions/search';
import {
	showOverlay
} from '../actions/ui';

const mapStateToProps = (state: any) => {
	const { search } = state;

	return {
		count: search.get('count'),
		list: search.get('results')
	};
};

const mapDispatchToProps = {
	showOverlay,
	getPhotos,
	setPhoto
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
