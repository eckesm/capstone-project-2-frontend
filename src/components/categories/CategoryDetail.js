import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import { getCategoryApi } from '../../helpers/api';
import { deleteCategory } from '../../actions/categories';
import { getNameFromId } from '../../helpers/filterArrays';

import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import EditCategoryForm from './EditCategoryForm';
import GoButton from '../buttons/GoButton';

export default function CategoryDetail() {
	const dispatch = useDispatch();
	const history = useHistory();

	const { categoryId } = useParams();
	const active = useSelector(store => store.active);

	const [ category, setCategory ] = useState(null);
	const [ editing, setEditing ] = useState(false);

	useEffect(
		async () => {
			const res = await getCategoryApi(categoryId);
			setCategory(res.data.category);
		},
		[ categoryId ]
	);

	// function getNameFromId(catGroupId) {
	// 	return active.catGroups.filter(cg => cg.id === catGroupId)[0].name;
	// }

	async function handleDelete() {
		try {
			const res = await dispatch(deleteCategory(category.id));
			if (res.status === 200) {
				history.push(`/restaurants/${category.restaurantId}/categories`);
			}
		} catch (err) {
			console.log('handleDelete() > deleteCategory() error:', err);
		}
	}

	return (
		<div>
			{category &&
			!editing && (
				<div>
					<h1>{category.name}</h1>
					<div>
						{category.catGroupId && (
							<p>
								Category Group:{' '}
								<Link
									to={`/restaurants/${category.restaurantId}/category-groups/${category.catGroupId}`}
								>
									{getNameFromId(active.catGroups, category.catGroupId)}
								</Link>
							</p>
						)}
						{category.cogsPercent && (
							<p>COGS Percentage: {Math.floor(category.cogsPercent * 10000) / 100}%</p>
						)}
						{category.notes && <p>Notes: {category.notes}</p>}
					</div>
					{active &&
					active.isAdmin && (
						<div>
							{active.isAdmin && <EditButton onClick={() => setEditing(true)} text="Edit Category" />}
							{active.isAdmin && <DeleteButton text="Delete Category" onClick={handleDelete} />}
							<GoButton
								text="All Categories"
								onClick={() => history.push(`/restaurants/${category.restaurantId}/categories`)}
							/>
						</div>
					)}
				</div>
			)}

			{category &&
			active &&
			editing && (
				<div>
					<h1>Edit Category</h1>
					<EditCategoryForm
						id={category.id}
						name={category.name}
						catGroupId={category.catGroupId}
						cogsPercent={category.cogsPercent}
						notes={category.notes}
						catGroups={active.catGroups}
						setCategory={setCategory}
						setEditing={setEditing}
					/>
				</div>
			)}
		</div>
	);
}
