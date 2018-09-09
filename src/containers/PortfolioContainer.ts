import { connect } from 'react-redux';
// import { goBack } from 'react-router-redux';
import { Portfolio } from '../components/Portfolio';
import {
	addShares,
	removeShares,
} from '../actions/portfolio';

const makeMapStateToProps = () => {

	const mapStateToProps = (state: any) => {
		const { Portfolio } = state;
		
		return {
			Portfolio
		};
	};

	return mapStateToProps;
};

const mapDispatchToProps = {
	addShares,
	removeShares
};

export default connect(makeMapStateToProps, mapDispatchToProps)(Portfolio);
