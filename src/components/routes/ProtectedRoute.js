// Referenced https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e for help

import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, path, ...rest }) {
	const { user } = useSelector(store => store.auth);

	// return <Route {...rest} render={props => (user ? <Component {...props} {...rest} /> : <ProtectedRouteScreen />)} />;
	return (
		<Route
			{...rest}
			render={props => (user ? <Component {...props} {...rest} /> : <h1>Protected Route! Sign in to access.</h1>)}
		/>
	);
}
