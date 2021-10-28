import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// import useFields from '../../hooks/useFields';

import './NavBar.css';

export default function NavBar({ logout }) {
	const { user } = useSelector(store => store.auth);
	const active = useSelector(store => store.active);
	const { invoices } = useSelector(store => store.invoices);

	// const initialState = {
	// 	settingsLink : ''
	// };
	// const [ formData, handleChange, resetFormData ] = useFields(initialState);

	function loggedIn() {
		return (
			<ul>
				<li className="Home">
					<NavLink exact to="/">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink exact to="/restaurants">
						My Restaurants
					</NavLink>
				</li>
				{active && (
					<li className="ActiveRestaurant">
						<NavLink exact to={`/restaurants/${active.id}`}>
							{active.name}
						</NavLink>
					</li>
				)}
				{/* {active && (
					<li>
						<label htmlFor="settingsLink">:</label>
						<select
							type="text"
							id="settingsLink"
							value={formData.settingsLink}
							name="settingsLink"
							onChange={handleChange}
						>
							<option key="1" value="/meal-periods">
								Meal Periods
							</option>
						</select>
					</li>
				)} */}
				{active && (
					<li>
						<NavLink to={`/restaurants/${active.id}/meal-periods`}>Meal Periods</NavLink>
					</li>
				)}
				{active && (
					<li>
						<NavLink to={`/restaurants/${active.id}/category-groups`}>Category Groups</NavLink>
					</li>
				)}
				{active && (
					<li>
						<NavLink to={`/restaurants/${active.id}/categories`}>Categories</NavLink>
					</li>
				)}
				{active && (
					<li>
						<NavLink to={`/restaurants/${active.id}/default-sales`}>Default Sales</NavLink>
					</li>
				)}
				{active && (
					<li>
						<NavLink to={`/restaurants/${active.id}/sales-percentages`}>Sales Percentages</NavLink>
					</li>
				)}
				{active && (
					<li>
						<NavLink to={`/restaurants/${active.id}/sales`}>Daily Sales</NavLink>
					</li>
				)}
				{invoices &&
				active && (
					<li>
						<NavLink to={`/restaurants/${active.id}/invoices`}>Invoices</NavLink>
					</li>
				)}
				{active && (
					<li>
						<NavLink to={`/restaurants/${active.id}/budget`}>Budget</NavLink>
					</li>
				)}
				<li>
					<NavLink to="/logout" onClick={logout}>
						Log Out
					</NavLink>
				</li>
			</ul>
		);
	}

	function loggedOut() {
		return (
			<ul>
				<li className="Home">
					<NavLink exact to="/">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/login">Log In</NavLink>
				</li>

				<li>
					<NavLink to="/register">New User</NavLink>
				</li>
			</ul>
		);
	}

	return <div className="Nav">{user ? loggedIn() : loggedOut()}</div>;
}
