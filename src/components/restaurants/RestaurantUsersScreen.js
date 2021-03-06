import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import GoButton from '../buttons/GoButton';
import RestaurantUserCard from './RestaurantUserCard';

import './restaurants.css';
import '../screen.css';

export default function RestaurantUsersScreen() {
	const history = useHistory();

	const active = useSelector(store => store.active);
	const user = useSelector(store => store.auth);

	return (
		<div className="Window">
			{active &&
			user && (
				<div className="RestaurantUsersScreen Screen">
					<p className="ScreenTitle">Users</p>
					{active.isAdmin && (
						<div className="ButtonGroup">
							<GoButton
								text="Add User"
								onClick={() => history.push(`/restaurants/${active.id}/users/add`)}
							/>
						</div>
					)}
					<div className="CardsContainer">
						{active.users.map(u => {
							return (
								<RestaurantUserCard
									key={u.id}
									user={u}
									isAdmin={u.isAdmin}
									isOwner={active.ownerId == u.id}
									showAdminControls={active.isAdmin}
									restaurantId={active.id}
									self={user.user.userId === u.id}
								/>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
