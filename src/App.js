import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import './App.css';

import Routes from './components/routes/Routes';

import { getAccessToken } from './helpers/api';
import { getAndStoreUserInfo, logoutUser } from './actions/auth';

import NavBar from './components/navBar/NavBar';

function App() {
	const dispatch = useDispatch();
	// const history = useHistory();
	const { user } = useSelector(store => store.auth);
	const token = getAccessToken();

	useEffect(async () => {
		if (!user && token) {
			try {
				const res = await dispatch(getAndStoreUserInfo());
				if (res.status === 200) {
					// history.push('/');
					// console.log('success');
				}
			} catch (err) {
				console.log(err);
			}
		}
	});

	function handleLogout() {
		dispatch(logoutUser());
		// history.push('/');
	}

	return (
		<div className="App">
			<NavBar logout={handleLogout} />
			<Routes />
		</div>
	);
}

export default App;
