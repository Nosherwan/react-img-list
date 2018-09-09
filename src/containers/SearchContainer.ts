import { connect } from 'react-redux';
// import { goBack } from 'react-router-redux';
import { Search } from '../components/Search';
import {
	getSymbolList,
	doSearch
} from '../actions/search';

const makeMapStateToProps = () => {

	const mapStateToProps = (state: any) => {
		const { search } = state;
		
		return {
			search
		};
	};

	return mapStateToProps;
};

const mapDispatchToProps = {
	doSearch,
	getSymbolList
};

export default connect(makeMapStateToProps, mapDispatchToProps)(Search);
