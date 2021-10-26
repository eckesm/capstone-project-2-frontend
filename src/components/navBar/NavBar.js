import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

export default function NavBar({ logout }) {
	const { user } = useSelector(store => store.auth);
	const active = useSelector(store => store.active);
	const { invoices } = useSelector(store => store.invoices);

	function loggedIn() {
		return (
			<ul>
				<li>
					<NavLink to="/restaurants">My Restaurants</NavLink>
				</li>
				{active && (
					<li>
						<NavLink to={`/restaurants/${active.id}`}>{active.name}</NavLink>
					</li>
				)}
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
				{invoices &&
				active && (
					<li>
						<NavLink to={`/restaurants/${active.id}/invoices`}>Invoices</NavLink>
					</li>
				)}
				<li>
					<NavLink to="/" onClick={logout}>
						Log Out
					</NavLink>
				</li>
			</ul>
		);
	}

	function loggedOut() {
		return (
			<ul>
				<li>
					<NavLink to="/login">Log In</NavLink>
				</li>
				<li>
					<NavLink to="/register">New User</NavLink>
				</li>
			</ul>
		);
	}

	return (
		<nav>
			<Link to="/">Budget</Link>
			{user ? loggedIn() : loggedOut()}
		</nav>
	);
}
