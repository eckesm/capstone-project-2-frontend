import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import { getAndStoreRestaurantInfo } from '../../actions/restaurants';

export default function RestaurantDetail() {
	const dispatch = useDispatch();
	const history = useHistory();
	const restaurant = useSelector(store => store.restaurants.active);
	const { id } = useParams();

	useEffect(
		async () => {
			try {
				const res = await dispatch(getAndStoreRestaurantInfo(id));
				// if (res.status === 404) {
				// 	history.push('/not-found');
				// }
			} catch (err) {
				console.log('useEffect() > getAndStoreRestaurauntInfo(id) error:', err);
			}
		},
		[ id ]
	);

	return (
		<div>
			<h1>Restaurant Detail {id}</h1>
			{restaurant && (
				<div>
					<p>Name: {restaurant.name}</p>
					<p>Address: {restaurant.address}</p>
					<p>Phone Number: {restaurant.phone}</p>
					<p>Email Address: {restaurant.email}</p>
					<p>Website: {restaurant.website}</p>
					<p>Notes: {restaurant.notes}</p>
				</div>
			)}
		</div>
	);
}
