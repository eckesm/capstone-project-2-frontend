import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import AddButton from '../buttons/AddButton';
import GoButton from '../buttons/GoButton';

import { removeActiveRestaurant } from '../../actions/restaurants';

import '../screen.css';

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
				<p className="ScreenTitle">Welcome, {user.firstName}!</p>
				<div className="Section Centered Card">
					{restaurants &&
					restaurants.length > 0 && (
						<div>
							<p className="SectionTitle3">My Restaurants</p>
							<ul className="IgnoreList">
								{restaurants.map(r => {
									return (
										<li key={r.id}>
											<Link to={`/restaurants/${r.id}`}>{r.name}</Link>
										</li>
									);
								})}
							</ul>
						</div>
					)}
					{restaurants &&
					restaurants.length === 0 && (
						<div>
							<h3>You don't have any restaurants yet... would you like to add one?</h3>
							<AddButton text="Add Restaurant" onClick={() => history.push('/restaurants/new')} />
						</div>
					)}
				</div>
			</div>
		);
	}

	function loggedOut() {
		return (
			<div>
				<p className="ScreenTitle">Home</p>
				<div className="ButtonGroup">
					<GoButton onClick={() => history.push('/login')} text="Log In" />
					<GoButton onClick={() => history.push('/register')} text="New User" />
				</div>
			</div>
		);
	}

	return (
		<div className="Window">
			<div className="HomeScreen Screen">
				<div className='BasicView'>

				{user ? loggedIn() : loggedOut()}
				</div>
				</div>
		</div>
	);
}
