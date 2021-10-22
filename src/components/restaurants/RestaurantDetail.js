import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import { deleteRestaurant } from '../../actions/restaurants';

import AllMealPeriods from '../mealPeriods/AllMealPeriods';
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/CancelButton';
import EditRestaurantForm from './EditRestaurantForm';
import GoButton from '../buttons/GoButton';

export default function RestaurantDetail() {
	const dispatch = useDispatch();
	const history = useHistory();

	const restaurantId = Number(useParams().restaurantId);
	const { active } = useSelector(store => store.restaurants);

	const [ restaurant, setRestaurant ] = useState(null);
	const [ editing, setEditing ] = useState(false);

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
		<div>
			{restaurant &&
			!editing && (
				<div>
					<h1>Restaurant Detail {restaurantId}</h1>

					<div>
						<p>Name: {restaurant.name}</p>
						<p>Address: {restaurant.address}</p>
						<p>Phone Number: {restaurant.phone}</p>
						<p>Email Address: {restaurant.email}</p>
						<p>Website: {restaurant.website}</p>
						<p>Notes: {restaurant.notes}</p>
					</div>

					<div>
						<h2>Meal Periods</h2>
						<AllMealPeriods />
					</div>
					{active &&
					active.isAdmin && (
						<div>
							<EditButton onClick={() => setEditing(true)} text="Edit Restaurant" />
							<DeleteButton text="Delete Restaurant" onClick={handleDelete} />
							<GoButton text="Go to All Restaurants" onClick={() => history.push(`/restaurants/`)} />
						</div>
					)}
				</div>
			)}

			{restaurant &&
			editing && (
				<div>
					<h1>Restaurant Form</h1>
					<EditRestaurantForm
						id={restaurant.id}
						name={restaurant.name}
						address={restaurant.address}
						phone={restaurant.phone}
						email={restaurant.email}
						website={restaurant.website}
						notes={restaurant.notes}
						// setRestaurant={setRestaurant}
						setEditing={setEditing}
					/>
				</div>
			)}
		</div>
	);
}
