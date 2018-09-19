import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './containers/AppContainer';
import '../assets/css/global.css';

interface Module {
	hot: any
}

declare const module: Module 

const render = (Component: any) => {
  ReactDOM.render(
		<AppContainer>
			<Component/>
		</AppContainer>
    ,
    document.getElementById('app')
  );
}

render(RootContainer);

if (module.hot) {
  module.hot.accept('./containers/AppContainer', () => { render(RootContainer) });
}
