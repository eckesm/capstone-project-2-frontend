import React from 'react';
import { useHistory } from 'react-router';

import GoButton from '../buttons/GoButton';

import '../screen.css';
import './restaurants.css';

export default function RestaurantDetail({ restaurant }) {
	const history = useHistory();

	return (
		<div className="RestaurantDetail Card">
			<p className="ScreenTitle">{restaurant.name}</p>
			<div className="Section Full">
				<p className="SectionTitle3">Actions</p>
				<div className="ActionButtonsGroup">
					<GoButton
						text="Enter Daily Sales"
						onClick={() => history.push(`/restaurants/${restaurant.id}/sales`)}
					/>
					<GoButton
						text="Enter Invoices"
						onClick={() => history.push(`/restaurants/${restaurant.id}/invoices`)}
					/>
					<GoButton
						text="See Budget Performance"
						onClick={() => history.push(`/restaurants/${restaurant.id}/budget`)}
					/>
				</div>
			</div>

			{(restaurant.address || restaurant.phone || restaurant.email || restaurant.website) && (
				<div className="Section Full">
					<p className="SectionTitle3">Details</p>
					<ul className="IgnoreList">
						{restaurant.address && (
							<li className="InputGroup">
								<label>Address:</label>
								<span>{restaurant.address}</span>
							</li>
						)}
						{restaurant.phone && (
							<li className="InputGroup">
								<label>Phone Number:</label>
								<span>{restaurant.phone}</span>
							</li>
						)}
						{restaurant.email && (
							<li className="InputGroup">
								<label>Email Address:</label>
								<span>{restaurant.email}</span>
							</li>
						)}
						{restaurant.website && (
							<li className="InputGroup">
								<label>Website:</label>
								<span>{restaurant.website}</span>
							</li>
						)}
					</ul>
				</div>
			)}

			{restaurant.notes && (
				<div className="Section Full">
					<p className="SectionTitle3">Notes</p>
					<p className="Notes">{restaurant.notes}</p>
				</div>
			)}
		</div>
	);
}
