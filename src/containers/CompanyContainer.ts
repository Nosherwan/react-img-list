import { connect } from 'react-redux';
// import { goBack } from 'react-router-redux';
import { Company } from '../components/Company';
import {
	addShares,
	removeShares,
} from '../actions/company';

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
	addShares,
	removeShares
};

export default connect(makeMapStateToProps, mapDispatchToProps)(Company);
