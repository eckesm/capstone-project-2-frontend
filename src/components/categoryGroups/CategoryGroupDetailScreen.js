import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { BackendApi } from '../../api/api';
import { filterCatGroupId } from '../../helpers/filterArrays';

import CategoryGroupDetail from './CategoryGroupDetail';

import '../screen.css';

export default function CategoryGroupDetailScreen() {
	const { catGroupId } = useParams();
	const active = useSelector(store => store.active);

	const [ categoryGroup, setCategoryGroup ] = useState(null);
	const [ categories, setCategories ] = useState([]);

	useEffect(
		async () => {
			const res = await BackendApi.getCategoryGroupApi(catGroupId);
			setCategoryGroup(res.data.catGroup);
		},
		[ catGroupId ]
	);

	useEffect(
		() => {
			if (catGroupId && active) {
				setCategories(filterCatGroupId(active.categories, catGroupId));
			}
		},
		[ catGroupId, active ]
	);

	return (
		<div className="Window">
			<div className="CategoryGroupDetailScreen Screen">
				{categoryGroup && (
					<CategoryGroupDetail
						categoryGroup={categoryGroup}
						categories={categories}
						isAdmin={active.isAdmin}
						setCategoryGroup={setCategoryGroup}
					/>
				)}
			</div>
		</div>
	);
}
