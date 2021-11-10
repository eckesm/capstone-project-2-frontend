import React from 'react';

export default function RestaurantUserCard({ id, firstName, lastName, emailAddress, isAdmin }) {
	return (
		<div>
			<h3>
				{firstName} {lastName}
			</h3>
			<ul>
				<li>{emailAddress}</li>
				{isAdmin && <li>Administrator</li>}
			</ul>
		</div>
	);
}
