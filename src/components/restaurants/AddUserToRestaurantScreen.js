import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AddUserToRestaurantForm from './AddUserToRestaurantForm';

import './restaurants.css';

export default function AddUserToRestaurantScreen() {

	const active = useSelector(store => store.active);

	return (
		<div className="RestaurantUsers">
			{active && (
				<div>
					<h1>Add User to Restaurant</h1>
					<AddUserToRestaurantForm restaurantId={active.id} />
				</div>
			)}
		</div>
	);
}
