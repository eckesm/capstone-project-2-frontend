import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { changeUserRestaurantAccess, deleteUserRestaurantAccess } from '../../actions/restaurants';

import ConfirmDangerModalButton from '../buttons/ConfirmDangerModalButton';

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
				console.log(res.message);
			}
			return res;
		} catch (err) {
			console.log('handleSubmit() > addUserToRestaurant() error:', err);
		}
	}

	async function handleDeleteAccess(self = false) {
		try {
			const res = await dispatch(deleteUserRestaurantAccess(restaurantId, user.id, self));
			if (res.status !== 200) {
				console.log(res.message);
			}
		} catch (err) {
			console.log('handleSubmit() > deleteUserRestaurantAccess() error:', err);
		}
	}

	async function handleRemoveSelf() {
		history.push('/restaurants');
		const res = await dispatch(deleteUserRestaurantAccess(restaurantId, user.id, true));
		if (res.status === 200) {
			console.log('Successfully removed from restaurant.');
		}
		else {
			console.log('There was a problem removing you from the restaurant.');
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
				!isOwner && (
					<ConfirmDangerModalButton
						onConfirm={handleChangeAccess}
						text="Make Administrator"
						confirmText={'Are you sure you would like to make this user an administrator?'}
						confirmButtonText="Make Administrator"
					/>
				)}
				{showAdminControls &&
				!self &&
				isAdmin &&
				!isOwner && (
					<ConfirmDangerModalButton
						onConfirm={handleChangeAccess}
						text="Make User"
						confirmText={"Are you sure you would like to downgrade this user's priveleges?"}
						confirmButtonText="Make User"
					/>
				)}
				{showAdminControls &&
				!self &&
				!isOwner && (
					<ConfirmDangerModalButton
						onConfirm={handleDeleteAccess}
						text="Remove from Restaurant"
						confirmText={'Are you sure you would like to remove this user from the restaurant?'}
						confirmButtonText="Remove"
					/>
				)}
				{self &&
				!isOwner && (
					<ConfirmDangerModalButton
						onConfirm={handleRemoveSelf}
						text="Remove Self from Restaurant"
						confirmText={
							'Are you sure you would like to remove yourself from this restaurant?  This action cannot be undone.'
						}
						confirmButtonText="Remove Me"
					/>
				)}
			</div>
		</div>
	);
}
