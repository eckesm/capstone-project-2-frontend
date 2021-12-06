import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { BackendApi } from '../../api/api';

import CategoryDetail from './CategoryDetail';

import '../screen.css';

export default function CategoryDetailScreen() {
	const { categoryId } = useParams();
	const active = useSelector(store => store.active);

	const [ category, setCategory ] = useState(null);
	const [ catGroups, setCatGroups ] = useState([]);

	useEffect(
		async () => {
			const res = await BackendApi.getCategoryApi(categoryId);
			setCategory(res.data.category);
		},
		[ categoryId ]
	);

	useEffect(
		() => {
			if (categoryId && active) {
				setCatGroups(active.catGroups);
			}
		},
		[ categoryId, active ]
	);

	return (
		<div className="Window">
			<div className="CategoryDetailScreen Screen">
				{category && (
					<CategoryDetail
						category={category}
						catGroups={catGroups}
						isAdmin={active.isAdmin}
						setCategory={setCategory}
					/>
				)}
			</div>
		</div>
	);
}
