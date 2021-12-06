import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { deleteCategoryGroup } from '../../actions/categoryGroups';

import EditButton from '../buttons/EditButton';
import EditCategoryGroupForm from './EditCategoryGroupForm';
import GoButton from '../buttons/GoButton';
import ConfirmDangerModalButton from '../buttons/ConfirmDangerModalButton';

import { shortenWithEllipse } from '../../helpers/textAdjustments';

export default function CategoryGroupDetail({ categoryGroup, categories, isAdmin = false, setCategoryGroup }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const [ editing, setEditing ] = useState(false);

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
		<div className="CategoryGroupDetail">
			{!editing && (
				<div className="BasicView">
					<p className="ScreenTitle">{categoryGroup.name}</p>{' '}
					{categories.length > 0 && (
						<ul className="IgnoreList Centered">
							{categories.map(c => {
								return (
									<li key={c.id}>
										<Link to={`/restaurants/${c.restaurantId}/categories/${c.id}`}>{ shortenWithEllipse(c.name,30)}</Link>
									</li>
								);
							})}
						</ul>
					)}
					{categoryGroup.notes && (
						<div className="NotesContainer">
							<b>Notes</b>: <span className="Notes">{categoryGroup.notes}</span>
						</div>
					)}
					<div className="ButtonGroup">
						{isAdmin && <EditButton onClick={() => setEditing(true)} text="Edit Group" />}
						{isAdmin && <ConfirmDangerModalButton onConfirm={handleDelete} text="Delete Group" confirmText={'Are you sure you would like to delete category group?  This action cannot be undone.'} confirmButtonText='Confirm Delete' />}
						<GoButton
							text="All Groups"
							onClick={() => history.push(`/restaurants/${categoryGroup.restaurantId}/category-groups`)}
						/>
					</div>
				</div>
			)}

			{editing && (
				<div>
					<p className="ScreenTitle">Edit Category Group</p>
					<div className="FullFormContainer">
						<EditCategoryGroupForm
							id={categoryGroup.id}
							name={categoryGroup.name}
							notes={categoryGroup.notes}
							setCategoryGroup={setCategoryGroup}
							setEditing={setEditing}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
