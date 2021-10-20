import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import Routes from './components/routes/Routes';

import { getAccessToken } from './helpers/api';
import { getAndStoreUserInfo } from './actions/auth';

function App() {
	const dispatch = useDispatch();
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

	return (
		<div className="App">
			<Routes />
		</div>
	);
}

export default App;
