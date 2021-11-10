import React from 'react';
import { useSelector } from 'react-redux';

import RestaurantDetail from './RestaurantDetail';

import '../screen.css';
import './restaurants.css';

export default function RestaurantDetailScreen() {
	const active = useSelector(store => store.active);

	return (
		<div className="Window">
			<div className="Screen">
				{active && <p className="ScreenTitle">{active.name}</p>}
				{active && <RestaurantDetail restaurant={active} />}
			</div>
		</div>
	);
}
