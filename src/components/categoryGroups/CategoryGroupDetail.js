import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import { getCategoryGroupApi } from '../../helpers/api';
import { deleteCategoryGroup } from '../../actions/categoryGroups';

import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import EditCategoryGroupForm from './EditCategoryGroupForm';
import GoButton from '../buttons/GoButton';

export default function CategoryGroupDetail() {
	const dispatch = useDispatch();
	const history = useHistory();

	const { catGroupId } = useParams();
	const { active } = useSelector(store => store.restaurants);

	const [ categoryGroup, setCategoryGroup ] = useState(null);
	const [ editing, setEditing ] = useState(false);

	useEffect(
		async () => {
			const res = await getCategoryGroupApi(catGroupId);
			setCategoryGroup(res.data.catGroup);
		},
		[ catGroupId ]
	);

	async function handleDelete() {
		try {
			const res = await dispatch(deleteCategoryGroup(categoryGroup.id));
			if (res.status === 200) {
				history.push(`/restaurants/${categoryGroup.restaurantId}/category-groups`);
			}
		} catch (err) {
			console.log('handleDelete() > deleteCategoryGroup() error:', err);
		}
	}

	return (
		<div>
			{categoryGroup &&
			!editing && (
				<div>
					<h1>Meal Period Detail {categoryGroup.id}</h1>
					<div>
						{categoryGroup.name && <p>Name: {categoryGroup.name}</p>}
						{categoryGroup.notes && <p>Notes: {categoryGroup.notes}</p>}
					</div>
					<div>
						{active &&
						active.isAdmin && <EditButton onClick={() => setEditing(true)} text="Edit Category Group" />}
						{active.isAdmin && <DeleteButton text="Delete Category Group" onClick={handleDelete} />}
						<GoButton
							text="Go to All Category Groups"
							onClick={() => history.push(`/restaurants/${categoryGroup.restaurantId}/category-groups`)}
						/>
					</div>
				</div>
			)}

			{categoryGroup &&
			editing && (
				<div>
					<h1>Meal Period Form {categoryGroup.id}</h1>
					<EditCategoryGroupForm
						id={categoryGroup.id}
						name={categoryGroup.name}
						notes={categoryGroup.notes}
						setCategoryGroup={setCategoryGroup}
						setEditing={setEditing}
					/>
				</div>
			)}
		</div>
	);
}
