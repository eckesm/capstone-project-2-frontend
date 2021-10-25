import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import AddButton from '../components/buttons/AddButton';

import { removeActiveRestaurant } from '../actions/restaurants';

export default function Home() {
	const dispatch = useDispatch();
	const history = useHistory();

	const { user } = useSelector(store => store.auth);
	const { restaurants } = useSelector(store => store.restaurants);

	useEffect(() => {
		dispatch(removeActiveRestaurant());
	}, []);

	function loggedIn() {
		return (
			<div>
				{restaurants &&
				restaurants.length > 0 && (
					<ul>
						{restaurants.map(r => {
							return (
								<li key={r.id}>
									<Link to={`/restaurants/${r.id}`}>{r.name}</Link>
								</li>
							);
						})}
					</ul>
				)}
				{restaurants &&
				restaurants.length === 0 && (
					<div>
						<h3>You don't have any restaurants yet... would you like to add one?</h3>
						<AddButton text="Add Restaurant" onClick={() => history.push('/restaurants/new')} />
					</div>
				)}
			</div>
		);
	}

	function loggedOut() {
		return (
			<div>
				<button onClick={() => history.push('/login')}>Log In</button>
				<button onClick={() => history.push('/register')}>New User</button>
			</div>
		);
	}

	return (
		<div>
			<h1>Home</h1>
			{user ? loggedIn() : loggedOut()}
		</div>
	);
}
