import { connect } from 'react-redux';
// import { goBack } from 'react-router-redux';
import { Search } from '../components/Search';
import {
	getSymbolList,
	search
} from '../actions/search';

const makeMapStateToProps = () => {

	const mapStateToProps = (state: any) => {
		const { company } = state;
		
		return {
			company
		};
	};

	return mapStateToProps;
};

const mapDispatchToProps = {
	search,
	getSymbolList
};

export default connect(makeMapStateToProps, mapDispatchToProps)(Search);
