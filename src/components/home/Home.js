import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import AddButton from '../buttons/AddButton';
import GoButton from '../buttons/GoButton';

import { removeActiveRestaurant } from '../../actions/restaurants';

import '../screen.css';
import './home.css';

export default function Home() {
	const dispatch = useDispatch();
	const history = useHistory();

	const { user } = useSelector(store => store.auth);
	const { restaurants } = useSelector(store => store.restaurants);

	useEffect(() => {
		dispatch(removeActiveRestaurant());
	}, []);

	function instructions() {
		return (
			<div className="Instructions">
				<p className="SectionTitle4">To get started with a restaurant:</p>
				<ul>
					<li>
						<b>Add meal periods</b> <i>(lunch, dinner, etc.)</i>
					</li>
					<li>
						<b>Add sales and cost categories</b> <i>(food, wine, etc.)</i>{' '}
						<b>and costs of goods sold (COGS) percentages</b> <i>(30% foods COGS)</i>{' '}
						<b>to establish budget percetnages</b>{' '}
						<i>(the amount you would like to spend as a percentage of sales by category)</i>
					</li>
					<li>
						<b>Configure default sales</b> <i>($5,000 expected sales for Thursday lunch)</i>
					</li>
					<li>
						<b>Configure meal period sales percentages</b>{' '}
						<i>(50% of lunch sales expected to go to food)</i>
					</li>
				</ul>
				<p className="SectionTitle4">Throughout the week:</p>
				<ul>
					<li>
						Update your <b>expected sales</b> numbers, enter <b>actual sales</b> results as meal periods
						finish
					</li>
					<li>
						Add <b>invoices</b> to account for any spending that occurs
					</li>
					<li>
						Reference the <b>Budget screen</b> frequently to make sure you are sticking to your established
						cost of goods sold budgets!
					</li>
				</ul>
			</div>
		);
	}

	function loggedIn() {
		return (
			<div className="Home">
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
				<div className="InstructionsLoggedIn">
					{/* <p className="SectionTitle2">Instructions</p> */}
					{instructions()}
				</div>
			</div>
		);
	}

	function loggedOut() {
		return (
			<div className="Home">
				<p className="ScreenTitle">Home</p>
				<div className="BasicView">
					<div className="InstructionsHeadingLoggedOut">
						<p>A budgeting tool for restaurants to help keep track of variable costs in real-time!</p>
					</div>
					<div className="ButtonGroup">
						<GoButton onClick={() => history.push('/login')} text="Log In" />
						<GoButton onClick={() => history.push('/register')} text="New User" />
					</div>
					{instructions()}
				</div>
			</div>
		);
	}

	return (
		// <div className="Window">
			// <div className="HomeScreen Screen">{user ? loggedIn() : loggedOut()}</div>
			<div>{user ? loggedIn() : loggedOut()}</div>
		// </div>
	);
}
