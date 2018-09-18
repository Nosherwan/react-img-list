import { connect } from 'react-redux';
import { Search } from '../components/Search';
import {
	getPhotos
} from '../actions/search';

const mapStateToProps = (state: any) => {
	const { search } = state;

	return {
		count: search.get('count'),
		list: search.get('results')
	};
};

const mapDispatchToProps = {
	getPhotos
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
