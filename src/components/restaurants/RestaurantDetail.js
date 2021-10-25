import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import { deleteRestaurant } from '../../actions/restaurants';

import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/CancelButton';
import EditRestaurantForm from './EditRestaurantForm';
import GoButton from '../buttons/GoButton';

export default function RestaurantDetail() {
	const dispatch = useDispatch();
	const history = useHistory();

	const restaurantId = Number(useParams().restaurantId);
	const active = useSelector(store => store.active);

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
					<h1>{restaurant.name}</h1>
					{active &&
					active.isAdmin && (
						<div>
							{active.isAdmin && <EditButton onClick={() => setEditing(true)} text="Edit Restaurant" />}
							{active.isAdmin && <DeleteButton text="Delete Restaurant" onClick={handleDelete} />}
						</div>
					)}
					<ul>
						{restaurant.address && <li>Address: {restaurant.address}</li>}
						{restaurant.phone && <li>Phone Number: {restaurant.phone}</li>}
						{restaurant.email && <li>Email Address: {restaurant.email}</li>}
						{restaurant.website && <li>Website: {restaurant.website}</li>}
						{restaurant.notes && <li>Notes: {restaurant.notes}</li>}
					</ul>

					{active && (
						<div>
							<h2>Meal Periods</h2>
							<GoButton
								text="Go to Meal Periods"
								onClick={() => history.push(`/restaurants/${active.id}/meal-periods`)}
							/>
							<ul>
								{active.mealPeriods.map(m => {
									return (
										<li key={m.id}>
											<Link to={`/restaurants/${active.id}/meal-periods/${m.id}`}>{m.name}</Link>
										</li>
									);
								})}
							</ul>
						</div>
					)}
					{active && (
						<div>
							<h2>Category Groups</h2>
							<GoButton
								text="Go to Category Groups"
								onClick={() => history.push(`/restaurants/${active.id}/category-groups`)}
							/>
							<ul>
								{active.catGroups.map(c => {
									return (
										<li key={c.id}>
											<Link to={`/restaurants/${active.id}/category-groups/${c.id}`}>
												{c.name}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					)}
				</div>
			)}
			{active && (
				<div>
					<h2>Categories</h2>
					<GoButton
						text="Go to Categories"
						onClick={() => history.push(`/restaurants/${active.id}/categories`)}
					/>
					<ul>
						{active.categories.map(c => {
							return (
								<li key={c.id}>
									<Link to={`/restaurants/${active.id}/categories/${c.id}`}>{c.name}</Link>
								</li>
							);
						})}
					</ul>
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
						setEditing={setEditing}
					/>
				</div>
			)}
		</div>
	);
}
