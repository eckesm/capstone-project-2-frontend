import React from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AllCategoryGroups from './AllCategoryGroups';
import GoButton from '../buttons/GoButton';

import '../screen.css';

export default function AllCategoryGroupsScreen() {
	const history = useHistory();
	const active = useSelector(store => store.active);

	return (
		<div className="Window">
			<div className="AllCategoryGroupsScreen Screen">
				<p className="ScreenTitle">Category Groups</p>
				{active &&
				active.isAdmin && (
					<div className="ButtonGroup">
						<GoButton
							text="Add Category Group"
							onClick={() => history.push(`/restaurants/${active.id}/category-groups/new`)}
						/>
					</div>
				)}
				{active && <AllCategoryGroups catGroups={active.catGroups} categories={active.categories} />}
			</div>
		</div>
	);
}
