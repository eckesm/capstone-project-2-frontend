import React from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AllCategoryGroups from './AllCategoryGroups';
import AddButton from '../buttons/AddButton';
import GoButton from '../buttons/GoButton';

export default function AllCategoryGroupsScreen() {
	const history = useHistory();
	const active = useSelector(store => store.active);

	return (
		<div>
			<h1>Category Groups</h1>
			<div>
				{active &&
				active.isAdmin && (
					<AddButton
						text="Add Category Group"
						onClick={() => history.push(`/restaurants/${active.id}/category-groups/new`)}
					/>
				)}
				<GoButton text="Restaurant" onClick={() => history.push(`/restaurants/${active.id}`)} />
			</div>
			{active && <AllCategoryGroups catGroups={active.catGroups} categories={active.categories} />}
		</div>
	);
}
