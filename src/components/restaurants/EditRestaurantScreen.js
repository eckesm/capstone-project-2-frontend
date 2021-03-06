import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import { deleteRestaurant } from '../../actions/restaurants';

import EditRestaurantForm from './EditRestaurantForm';

import './restaurants.css';

export default function EditRestaurantScreen() {
	const dispatch = useDispatch();
	const history = useHistory();

	const restaurantId = Number(useParams().restaurantId);
	const active = useSelector(store => store.active);
	const { user } = useSelector(store => store.auth);

	const [ restaurant, setRestaurant ] = useState(null);

	useEffect(
		() => {
			setRestaurant(active);
		},
		[ active ]
	);

	async function handleDelete() {
		try {
			const res = await dispatch(deleteRestaurant(restaurantId));
			if (res.status === 200) {
				history.push(`/restaurants/`);
			}
		} catch (err) {
			console.log('handleDelete() > deleteRestaurant() error:', err);
		}
	}

	return (
		<div className="Window">
			<div className="EditRestaurantScreen Screen">
				<p className="ScreenTitle">Edit Restaurant</p>
				{active &&
				restaurant && (
					<div className="Section">
						<EditRestaurantForm
							id={restaurant.id}
							name={restaurant.name}
							address={restaurant.address}
							phone={restaurant.phone}
							email={restaurant.email}
							website={restaurant.website}
							notes={restaurant.notes}
							enableDelete={active.ownerId === user.userId}
							handleDelete={handleDelete}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
