import React from 'react';

import CategoryCard from './CategoryCard';

import { getNameFromId } from '../../helpers/filterArrays';

export default function AllCategories({ categories = [], catGroups = [] }) {
	return (
		<div>
			{categories.map(c => {
				return (
					<CategoryCard
						key={c.id}
						id={c.id}
						restaurantId={c.restaurantId}
						name={c.name}
						catGroupId={c.catGroupId}
						catGroupName={getNameFromId(catGroups, c.catGroupId)}
						cogsPercent={c.cogsPercent}
						notes={c.notes}
					/>
				);
			})}
		</div>
	);
}
