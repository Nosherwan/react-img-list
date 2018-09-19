import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../navigation/history';
import { configureStore } from '../store/configureStore';
import Routes from '../navigation/routes';
import { Navbar } from '../components/Navbar';
import { Overlay } from '../components/Overlay';


class AppContainer extends PureComponent {

	store: any

	componentWillMount() {
		this.store = configureStore();
	}

	render() {
		const {
			store
		} = this;
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<>
						<Overlay key={0} />
						<Routes key={1} />
					</>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default AppContainer;
