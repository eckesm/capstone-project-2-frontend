import React from 'react';

import { filterCatGroupId } from '../../helpers/filterArrays';
import CatGroupCard from './CategoryGroupCard';

export default function AllCategoryGroups({ catGroups = [], categories = [] }) {

	return (
		<div className='AllCategoryGroups CardsContainer Stacked'>
			{catGroups.map(cg => {
				return (
					<CatGroupCard
						key={cg.id}
						id={cg.id}
						restaurantId={cg.restaurantId}
						name={cg.name}
						notes={cg.notes}
						categories={filterCatGroupId(categories, cg.id)}
					/>
				);
			})}
		</div>
	);
}
