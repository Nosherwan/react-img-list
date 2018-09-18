import React from 'react';
import { Route } from 'react-router-dom';
import SearchContainer from '../containers/SearchContainer';

const MainRoutes = () => {
	return (
		<div>
			<Route exact path='/' component={SearchContainer} />
		</div>
	);
};

export default MainRoutes;
