import React from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AllCategories from './AllCategories';
import GoButton from '../buttons/GoButton';

import '../screen.css';

export default function AllCategoriesScreen() {
	const history = useHistory();
	const active = useSelector(store => store.active);

	return (
		<div className="Window">
			<div className="AllCategoriesScreen Screen">
				<p className="ScreenTitle">Categories</p>
				{active &&
				active.isAdmin && (
					<div className="ButtonGroup">
						<GoButton
							text="Add Category"
							onClick={() => history.push(`/restaurants/${active.id}/categories/new`)}
						/>
					</div>
				)}
				{active && <AllCategories categories={active.categories} catGroups={active.catGroups} />}
			</div>
		</div>
	);
}
