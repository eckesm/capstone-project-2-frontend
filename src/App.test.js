import React from 'react';
import { render, screen } from '@testing-library/react';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';

test('renders without crashing', () => {
	const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
	render(
		<Provider store={store}>
			<HashRouter>
				<App />
			</HashRouter>
		</Provider>
	);
});
