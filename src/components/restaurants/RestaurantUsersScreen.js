import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AddButton from '../buttons/AddButton';
import RestaurantUserCard from './RestaurantUserCard';

import './restaurants.css';

export default function RestaurantUsersScreen() {
	// const dispatch = useDispatch();
	const history = useHistory();

	const active = useSelector(store => store.active);

	return (
		<div className="RestaurantUsers">
			{active && (
				<div>
					<h1>Users</h1>
					<div>
						{active.users.map(u => {
							return (
								<RestaurantUserCard
									key={u.id}
									id={u.id}
									firstName={u.firstName}
									lastName={u.lastName}
									emailAddress={u.emailAddress}
									isAdmin={u.isAdmin}
								/>
							);
						})}
					</div>

					<AddButton text="Add User" onClick={() => history.push(`/restaurants/${active.id}/users/add`)} />
				</div>
			)}
		</div>
	);
}
