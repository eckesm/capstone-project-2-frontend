import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import '../screen.css';
import './restaurants.css';

export default function RestaurantCard({ restaurantId, name, notes = null, isAdmin = false, isOwner = false }) {
	const history = useHistory();

	return (
		<div className="RestaurantCard Card BackgroundHover ShadowHover" onClick={() => history.push(`/restaurants/${restaurantId}`)}>
			<p className="SectionTitle2">{name}</p>
			{/* <Link to={`/restaurants/${restaurantId}`}>Go to {name}</Link> */}
			<ul className="IgnoreList">
				<li className="InputGroup">
					<label>Access:</label>{' '}
					{isAdmin &&
					!isOwner && (
						<span>
							You are an <b>administrator</b> of {name} and can make changes to user access and most
							restaurant settings.
						</span>
					)}
					{isOwner && (
						<span>
							You are the <b>owner</b> of {name} and have full access privileges.
						</span>
					)}
					{!isAdmin &&
					!isOwner && (
						<span>
							You are a <b>user</b> of {name} and can access sales, invoices, and some restaurant
							settings.
						</span>
					)}
				</li>
				{notes && (
					<li className="NotesContainer">
						<b>Notes</b>: <span className="Notes">{notes}</span>
					</li>
				)}
			</ul>
		</div>
	);
}
