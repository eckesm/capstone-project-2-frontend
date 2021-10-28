import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import './App.css';

import Routes from './components/routes/Routes';

import { getAccessToken } from './helpers/api';
import { getAndStoreUserInfo, logoutUser } from './actions/auth';
import { prepareSavedAndEstimatedSales } from './helpers/calculations';
import { storeSalesWithEstimates } from './actions/sales';

import NavBar from './components/navBar/NavBar';

function App() {
	const dispatch = useDispatch();
	const { user } = useSelector(store => store.auth);
	const token = getAccessToken();

	useEffect(
		async () => {
			if (!user && token) {
				try {
					const res = await dispatch(getAndStoreUserInfo());
					// if (res.status === 200) {
					// }
				} catch (err) {
					console.log(err);
				}
			}
		},
		[ token, user ]
	);

	function handleLogout() {
		dispatch(logoutUser());
	}

	return (
		<div className="App">
			<NavBar logout={handleLogout} />
			<Routes />
		</div>
	);
}

export default App;
