import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { deleteCategory } from '../../actions/categories';
import { getNameFromId } from '../../helpers/filterArrays';

import EditButton from '../buttons/EditButton';
import EditCategoryForm from './EditCategoryForm';
import GoButton from '../buttons/GoButton';
import ConfirmDangerModalButton from '../buttons/ConfirmDangerModalButton';

import { shortenWithEllipse } from '../../helpers/textAdjustments';

import '../screen.css';

export default function CategoryDetail({ category, catGroups, isAdmin = false, setCategory }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [ editing, setEditing ] = useState(false);

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
		<div className="CategoryDetail">
			{!editing && (
				<div className="BasicView">
					<p className="ScreenTitle">{category.name}</p>
					<ul className="IgnoreList Left">
						{category.catGroupId && (
							<li className="InputGroup Left">
								<label>Category Group:</label>
								<Link
									to={`/restaurants/${category.restaurantId}/category-groups/${category.catGroupId}`}
								>
									{shortenWithEllipse(getNameFromId(catGroups, category.catGroupId), 30)}
								</Link>
							</li>
						)}
						{category.cogsPercent && (
							<li className="InputGroup">
								<label>COGS Percentage:</label>
								{Math.floor(category.cogsPercent * 10000) / 100}%
							</li>
						)}
						{category.notes && (
							<li className="NotesContainer">
								<b>Notes</b>: <span className="Notes">{category.notes}</span>
							</li>
						)}
					</ul>
					<div className="ButtonGroup">
						{isAdmin && <EditButton onClick={() => setEditing(true)} text="Edit Category" />}
						{isAdmin && (
							<ConfirmDangerModalButton
								onConfirm={handleDelete}
								text="Delete Category"
								confirmText={
									'Are you sure you would like to delete category?  This action cannot be undone.'
								}
								confirmButtonText="Confirm Delete"
							/>
						)}
						<GoButton
							text="All Categories"
							onClick={() => history.push(`/restaurants/${category.restaurantId}/categories`)}
						/>
					</div>
				</div>
			)}

			{editing && (
				<div>
					<p className="ScreenTitle">Edit Category</p>
					<div className="FullFormContainer">
						<EditCategoryForm
							id={category.id}
							name={category.name}
							catGroupId={category.catGroupId}
							cogsPercent={category.cogsPercent}
							notes={category.notes}
							catGroups={catGroups}
							setCategory={setCategory}
							setEditing={setEditing}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
