import React from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AllCategories from './AllCategories';
import AddButton from '../buttons/AddButton';
import GoButton from '../buttons/GoButton';

export default function AllCategoriesScreen() {
	const history = useHistory();
	const active = useSelector(store => store.active);

	return (
		<div>
			<div>
				<h1>Categories</h1>
				{active &&
				active.isAdmin && (
					<AddButton
						text="Add Category"
						onClick={() => history.push(`/restaurants/${active.id}/categories/new`)}
					/>
				)}
				<GoButton text="Restaurant" onClick={() => history.push(`/restaurants/${active.id}`)} />
			</div>
			{active && <AllCategories categories={active.categories} catGroups={active.catGroups} />}
		</div>
	);
}
