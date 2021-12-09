import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AddUserToRestaurantForm from './AddUserToRestaurantForm';

import '../screen.css';

export default function AddUserToRestaurantScreen() {
	const active = useSelector(store => store.active);

	return (
		<div className="Window">
			{active && (
				<div className="AddUserToRestaurantScreen Screen">
					<p className="ScreenTitle">Add User to Restaurant</p>
					<div className='Section'>
						<AddUserToRestaurantForm restaurantId={active.id} />
					</div>
				</div>
			)}
		</div>
	);
}
