// Referenced https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e for help

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams } from 'react-router-dom';

import { getAndStoreRestaurantInfo } from '../../actions/restaurants';

import '../screen.css';

export default function ProtectedRouteUser({ component: Component, path, ...rest }) {
	const dispatch = useDispatch();

	const { user } = useSelector(store => store.auth);
	const active = useSelector(store => store.active);
	const { restaurantsUser } = useSelector(store => store.restaurants);

	const [ error, setError ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const [ restaurantId, setRestaurantId ] = useState(null);
	const [ activeRestaurant, setActiveRestaurant ] = useState(null);

	useEffect(
		() => {
			setRestaurantId(Number(rest.computedMatch.params.restaurantId));
		},
		[ rest.computedMatch.params.restaurantId ]
	);

	useEffect(
		() => {
			setActiveRestaurant(active);
		},
		[ active ]
	);

	useEffect(
		async () => {
			if ((!activeRestaurant || activeRestaurant.id !== restaurantId) && restaurantId) {
				try {
					const res = await dispatch(getAndStoreRestaurantInfo(restaurantId));
					if (res.status === 200) {
						setError(false);
						setLoading(false);
					}
					else {
						setError(res.message);
						setLoading(false);
					}
				} catch (err) {
					console.log('useEffect() error:', err);
				}
			}
			else {
				setError(false);
				setLoading(false);
			}
		},
		[ restaurantsUser, restaurantId ]
	);

	function protectedRoutScreen(message) {
		return (
			<div className="Window">
				<div className="Screen">
					<div className="Section Border">
						<h1>{message}</h1>
					</div>
				</div>
			</div>
		);
	}

	if (loading) {
		return <Route {...rest} render={props => protectedRoutScreen('...loading...')} />;
	}
	else if (!user) {
		return <Route {...rest} render={props => protectedRoutScreen('Protected Route! Sign in to access.')} />;
	}
	else if (error) {
		return <Route {...rest} render={props => protectedRoutScreen(error)} />;
	}
	else {
		return <Route {...rest} render={props => <Component {...props} {...rest} />} />;
	}
}
