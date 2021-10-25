import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import { getCategoryGroupApi } from '../../helpers/api';
import { deleteCategoryGroup } from '../../actions/categoryGroups';
import { filterCatGroupId } from '../../helpers/filterArrays';

import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import EditCategoryGroupForm from './EditCategoryGroupForm';
import GoButton from '../buttons/GoButton';

export default function CategoryGroupDetail() {
	const dispatch = useDispatch();
	const history = useHistory();

	const { catGroupId } = useParams();
	const active = useSelector(store => store.active);

	const [ categoryGroup, setCategoryGroup ] = useState(null);
	const [ categories, setCategories ] = useState([]);
	const [ editing, setEditing ] = useState(false);

	useEffect(
		async () => {
			const res = await getCategoryGroupApi(catGroupId);
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
		[ active ]
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
					<h1>{categoryGroup.name}</h1>
					{categories.length > 0 && (
						<ul>
							{categories.map(c => {
								return (
									<li key={c.id}>
										<Link to={`/restaurants/${c.restaurantId}/categories/${c.id}`}>{c.name}</Link>
									</li>
								);
							})}
						</ul>
					)}
					<div>{categoryGroup.notes && <p>Notes: {categoryGroup.notes}</p>}</div>
					<div>
						{active &&
						active.isAdmin && <EditButton onClick={() => setEditing(true)} text="Edit Category Group" />}
						{active.isAdmin && <DeleteButton text="Delete Category Group" onClick={handleDelete} />}
						<GoButton
							text="All Groups"
							onClick={() => history.push(`/restaurants/${categoryGroup.restaurantId}/category-groups`)}
						/>
					</div>
				</div>
			)}

			{categoryGroup &&
			editing && (
				<div>
					<h1>Edit Category Group</h1>
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
