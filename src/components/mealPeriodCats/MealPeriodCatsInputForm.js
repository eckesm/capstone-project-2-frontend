import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerMealPeriodCat, updateMealPeriodCat, deleteMealPeriodCat } from '../../actions/mealPeriodCats';

export default function MealPeriodCatsInputForm({ mealPeriodName, categoryName, mealPeriodCat, updateGroupSum }) {
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
				// if (formData.total !== '0') {
				res = await dispatch(registerMealPeriodCat(mealPeriodId, categoryId, data));
				// }
				// else {
				// 	console.log('cannot create 0');
				// 	return false;
				// }
			}
			if (status === 'existing') {
				// if (formData.salesPercentOfPeriod === '0') {
				// 	res = await dispatch(deleteMealPeriodCat(mealPeriodId, categoryId));
				// }
				// else {
				res = await dispatch(updateMealPeriodCat(mealPeriodId, categoryId, data));
				// }
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
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="salesPercentOfPeriod">{categoryName}:</label>
				<input
					type="number"
					step=".0001"
					min="0"
					max="1"
					id="salesPercentOfPeriod"
					value={formData.salesPercentOfPeriod}
					name="salesPercentOfPeriod"
					onChange={handleChange}
					required
				/>
				{hasChanged && <button type="submit">Save</button>}
			</form>
		</div>
	);
}
