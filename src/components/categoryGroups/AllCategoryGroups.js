import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import CatGroupCard from './CategoryGroupCard';
import AddButton from '../buttons/AddButton';
import GoButton from '../buttons/GoButton';

export default function AllCategoryGroups() {
	const history = useHistory();

	const { active } = useSelector(store => store.restaurants);

	return (
		<div>
			<div>
				{active &&
					active.catGroups.map(m => {
						return (
							<CatGroupCard
								key={m.id}
								id={m.id}
								restaurantId={m.restaurantId}
								name={m.name}
								notes={m.notes}
							/>
						);
					})}
			</div>
			<div>
				{active &&
				active.isAdmin && (
					<AddButton
						text="Add Category Group"
						onClick={() => history.push(`/restaurants/${active.id}/category-groups/new`)}
					/>
				)}
				<GoButton
					text="Go to All Category Groups"
					onClick={() => history.push(`/restaurants/${active.id}/category-groups`)}
				/>
				<GoButton text="Go to Restaurant" onClick={() => history.push(`/restaurants/${active.id}`)} />
			</div>
		</div>
	);
}
