import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import NavBarDropdown from './NavBarDropdown';

import './NavBar.css';

export default function NavBar({ logout }) {
	const { user } = useSelector(store => store.auth);
	const active = useSelector(store => store.active);
	const { invoices } = useSelector(store => store.invoices);

	const settingsLinksArray = () => {
		return [
			{ title: 'Meal Periods', ref: `/restaurants/${active.id}/meal-periods` },
			{ title: 'Category Groups', ref: `/restaurants/${active.id}/category-groups` },
			{ title: 'Categories', ref: `/restaurants/${active.id}/categories` },
			{ title: 'Default Sales', ref: `/restaurants/${active.id}/default-sales` },
			{ title: 'Sales Percentages', ref: `/restaurants/${active.id}/sales-percentages` }
		];
	};

	const adminLinksArray = () => {
		return [ { title: 'Edit Restaurant', ref: `/restaurants/${active.id}/edit` } ];
	};

	const ownerLinksArray = () => {
		return [ { title: 'Edit Restaurant', ref: `/restaurants/${active.id}/edit` } ];
	};

	const invoicesLinksArray = () => {
		return [
			{ title: 'Invoices', ref: `/restaurants/${active.id}/invoices` },
			{ title: 'Add Invoice', ref: `/restaurants/${active.id}/invoices/new` }
		];
	};

	const loggedIn = () => {
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
				{active && (
					<li>
						<NavLink to={`/restaurants/${active.id}/sales`}>Daily Sales</NavLink>
					</li>
				)}
				{invoices &&
				active && (
					<NavBarDropdown title="Invoices" linksArray={invoicesLinksArray()} />
					// <li>
					// 	<NavLink to={`/restaurants/${active.id}/invoices`}>Invoices</NavLink>
					// </li>
				)}
				{active && (
					<li>
						<NavLink to={`/restaurants/${active.id}/budget`}>Budget</NavLink>
					</li>
				)}
				{active && <NavBarDropdown title="Settings" linksArray={settingsLinksArray()} />}
				{active &&
				active.isAdmin &&
				active.isOwner === false && <NavBarDropdown title="Admin" linksArray={adminLinksArray()} />}
				{active &&
				active.isAdmin &&
				active.isOwner && <NavBarDropdown title="Admin/Owner" linksArray={ownerLinksArray()} />}

				<li>
					<NavLink to="/logout" onClick={logout}>
						Log Out
					</NavLink>
				</li>
			</ul>
		);
	};

	const loggedOut = () => {
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
	};

	return <div className="Nav">{user ? loggedIn() : loggedOut()}</div>;
}
