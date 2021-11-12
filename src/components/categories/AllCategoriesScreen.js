import React from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AllCategories from './AllCategories';
import AddButton from '../buttons/AddButton';
import GoButton from '../buttons/GoButton';

import '../screen.css';

export default function AllCategoriesScreen() {
	const history = useHistory();
	const active = useSelector(store => store.active);

	return (
		<div className="Window">
			<div className="AllCategoriesScreen Screen">
				<p className="ScreenTitle">Categories</p>
				<div className="ButtonGroup">
					{active &&
					active.isAdmin && (
						<AddButton
							text="Add Category"
							onClick={() => history.push(`/restaurants/${active.id}/categories/new`)}
						/>
					)}
					<GoButton text="Restaurant" onClick={() => history.push(`/restaurants/${active.id}`)} />
				</div>
				<div className="BasicView">
					{active && <AllCategories categories={active.categories} catGroups={active.catGroups} />}
				</div>
			</div>
		</div>
	);
}
