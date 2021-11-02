import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import GoButton from '../buttons/GoButton';

import './RestaurantDetail.css';

export default function RestaurantDetail() {
	const history = useHistory();

	const active = useSelector(store => store.active);

	// async function handleDelete() {
	// 	try {
	// 		const res = await dispatch(deleteRestaurant(restaurantId));
	// 		if (res.status === 200) {
	// 			history.push(`/restaurants/`);
	// 		}
	// 	} catch (err) {
	// 		console.log('handleDelete() > deleteRestaurant() error:', err);
	// 	}
	// }

	return (
		<div className="RestaurantDetail">
			<div>
				{active && (
					<div>
						<p className="PageTitle">{active.name}</p>

						<div>
							<p className="SectionTitle">Actions</p>
							<GoButton
								text="Enter Daily Sales"
								onClick={() => history.push(`/restaurants/${active.id}/sales`)}
							/>
							<GoButton
								text="Enter Invoices"
								onClick={() => history.push(`/restaurants/${active.id}/invoices`)}
							/>
							<GoButton
								text="See Budget Performance"
								onClick={() => history.push(`/restaurants/${active.id}/budget`)}
							/>
						</div>

						<p className="SectionTitle">Details</p>
						<ul>
							{active.address && (
								<li>
									<b>Address</b>: {active.address}
								</li>
							)}
							{active.phone && (
								<li>
									<b>Phone Number</b>: {active.phone}
								</li>
							)}
							{active.email && (
								<li>
									<b>Email Address</b>: {active.email}
								</li>
							)}
							{active.website && (
								<li>
									<b>Website</b>: {active.website}
								</li>
							)}
						</ul>
						{active.notes && (
							<div>
								<p className="SectionTitle">Notes:</p>
								<p className="Notes">{active.notes}</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
