import React from 'react';
import { Route } from 'react-router-dom';
import PortfolioContainer from '../containers/PortfolioContainer';
import SearchContainer from '../containers/SearchContainer';
import CompanyContainer from '../containers/CompanyContainer';

const MainRoutes = () => {
	return (
		<div>
			<Route exact path='/' component={PortfolioContainer} />
			<Route path='/search' component={SearchContainer} />
			<Route path='/company' component={CompanyContainer} />
		</div>
	);
};

export default MainRoutes;
