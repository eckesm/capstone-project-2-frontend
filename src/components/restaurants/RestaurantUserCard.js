import React from 'react';
import { useDispatch } from 'react-redux';

import { changeUserRestaurantAccess } from '../../actions/restaurants';

import GoButton from '../buttons/GoButton';

import './restaurants.css';

export default function RestaurantUserCard({
	user,
	isAdmin,
	isOwner,
	showAdminControls = false,
	restaurantId,
	self = false
}) {
	const dispatch = useDispatch();

	async function handleChangeAccess() {
		try {
			const res = await dispatch(changeUserRestaurantAccess(restaurantId, user, { isAdmin: !isAdmin }));
			if (res.status === 201) {
				// history.push(`/restaurants/${restaurantId}/users`);
			}
			else {
				console.log(res.message);
			}
		} catch (err) {
			console.log('handleSubmit() > addUserToRestaurant() error:', err);
		}
	}

	return (
		<div className="RestaurantUserCard Card">
			<p className="SectionTitle2">
				{user.firstName} {user.lastName}
			</p>
			<ul className="IgnoreList">
				<li>{user.emailAddress}</li>
				{isOwner && <li>Owner</li>}
				{isAdmin && !isOwner && <li>Administrator</li>}
				{!isAdmin && !isOwner && <li>User</li>}
			</ul>
			{showAdminControls &&
			!self && (
				<div className="ButtonGroup">
					{!isAdmin && !isOwner && <GoButton text="Make Administrator" onClick={handleChangeAccess} />}
					{isAdmin && !isOwner && <GoButton text="Make User" onClick={handleChangeAccess} />}
				</div>
			)}
		</div>
	);
}
