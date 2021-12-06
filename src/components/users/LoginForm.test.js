import React from 'react';
import { render } from '@testing-library/react';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers/rootReducer';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import LoginForm from './LoginForm';
import { MemoryRouter } from 'react-router';

it('matches snapshot', function() {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
	const { asFragment } = render(
		<Provider store={store}>
			<MemoryRouter>
				<LoginForm />
			</MemoryRouter>
		</Provider>
	);
	expect(asFragment()).toMatchSnapshot();
});
