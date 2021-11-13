import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { changeUserRestaurantAccess, deleteUserRestaurantAccess } from '../../actions/restaurants';

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
	const history = useHistory();

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

	async function handleDeleteAccess() {
		try {
			const res = await dispatch(deleteUserRestaurantAccess(restaurantId, user.id));
			if (res.status === 200) {
				return res;
			}
			else {
				console.log(res.message);
			}
		} catch (err) {
			console.log('handleSubmit() > deleteUserRestaurantAccess() error:', err);
		}
	}

	async function handleRemoveSelf() {
		const res = await handleDeleteAccess();
		if (res.status === 200) {
			history.push('/restaurants');
			console.log('removed');
		}
	}

	return (
		<div className="RestaurantUserCard Card ShadowHover">
			<p className="SectionTitle2">
				{user.firstName} {user.lastName}
			</p>
			<ul className="IgnoreList">
				<li>{user.emailAddress}</li>
				{isOwner && <li>Owner</li>}
				{isAdmin && !isOwner && <li>Administrator</li>}
				{!isAdmin && !isOwner && <li>User</li>}
			</ul>

			<div className="ButtonGroup">
				{showAdminControls &&
				!self &&
				!isAdmin &&
				!isOwner && <GoButton text="Make Administrator" onClick={handleChangeAccess} />}
				{showAdminControls &&
				!self &&
				isAdmin &&
				!isOwner && <GoButton text="Make User" onClick={handleChangeAccess} />}
				{showAdminControls &&
				!self &&
				!isOwner && <GoButton text="Remove Access" onClick={handleDeleteAccess} />}
				{self && !isOwner && <GoButton text="Remove Self from Restaurant" onClick={handleRemoveSelf} />}
			</div>
		</div>
	);
}
