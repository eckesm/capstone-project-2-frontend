import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerMealPeriodCat, updateMealPeriodCat, deleteMealPeriodCat } from '../../actions/mealPeriodCats';

import SubmitButton from '../buttons/SubmitButton';

import './mealPeriodCats.css';

export default function MealPeriodCatsInputForm({
	mealPeriodName,
	categoryName,
	mealPeriodCat,
	updateGroupSum,
	isAdmin = false
}) {
	const dispatch = useDispatch();

	const {
		id = null,
		mealPeriodId,
		categoryId,
		salesPercentOfPeriod = null,
		notes = null,
		status = null
	} = mealPeriodCat;

	const initialState = {
		salesPercentOfPeriod : salesPercentOfPeriod === null ? 0 : salesPercentOfPeriod,
		notes                : notes === null ? `${mealPeriodName} ${categoryName} sales percentage.` : notes
	};
	const [ formData, setFormData ] = useState(initialState);
	const [ hasChanged, setHasChanged ] = useState(false);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
		if (
			name === 'salesPercentOfPeriod' &&
			value == initialState.salesPercentOfPeriod &&
			formData.notes == initialState.notes
		) {
			setHasChanged(false);
		}
		else {
			setHasChanged(true);
		}

		if (name === 'salesPercentOfPeriod') updateGroupSum(`${mealPeriodId}-${categoryId}`, value);
	};

	async function handleSubmit(evt) {
		evt.preventDefault();
		const data = { ...formData };
		try {
			let res;
			if (status === 'new') {
				res = await dispatch(registerMealPeriodCat(mealPeriodId, categoryId, data));
			}
			if (status === 'existing') {
				res = await dispatch(updateMealPeriodCat(mealPeriodId, categoryId, data));
			}

			if (res.status === 200 || res.status === 201) {
				setHasChanged(false);
			}
			else if (res.status === 400 || res.status === 404 || res.status === 500) {
				console.log(res.message);
			}
			else {
				console.log(res);
			}
		} catch (err) {
			console.log('handleSubmit() > register/MealPeriodCat() error:', err);
		}
	}

	useEffect(() => {
		updateGroupSum(`${mealPeriodId}-${categoryId}`, Number(salesPercentOfPeriod));
	}, []);

	return (
		<div className="MealPeriodCatsInputForm">
			<form onSubmit={handleSubmit} className="InputGroup">
				<label htmlFor="salesPercentOfPeriod">{categoryName}:</label>
				<input
					className="BackgroundHover"
					type="number"
					step=".0001"
					min="0"
					max="1"
					id="salesPercentOfPeriod"
					value={formData.salesPercentOfPeriod}
					name="salesPercentOfPeriod"
					onChange={handleChange}
					disabled={isAdmin ? false : true}
					required
				/>
				{hasChanged && <SubmitButton text="Save" />}
			</form>
		</div>
	);
}
