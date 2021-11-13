import React from 'react';

import NewRestaurantForm from './NewRestaurantForm';

import '../screen.css';

export default function NewRestaurantScreen() {

	return (
		<div className="Window">
			<div className="NewRestaurantScreen Screen">
				<p className="ScreenTitle">New Restaurant</p>
				<NewRestaurantForm />
			</div>
		</div>
	);
}
