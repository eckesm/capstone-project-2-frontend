import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerSale, updateSale, deleteSale } from '../../actions/sales';
import { registerMealPeriodCat } from '../../actions/mealPeriodCats';

import './sales.css';

export default function SalesInputForm({
	index,
	mealPeriodName,
	categoryName,
	dayName,
	dailySale,
	updateGroupExpectedSum,
	updateGroupActualSum
}) {
	const dispatch = useDispatch();

	const {
		id = null,
		date,
		restaurantId,
		expectedSales = null,
		actualSales = null,
		mealPeriodId,
		categoryId,
		mealPeriodCatId,
		notes = null,
		status = null
	} = dailySale;

	const initialState = {
		expectedSales : expectedSales === null ? 0 : Math.floor(expectedSales * 100) / 100,
		actualSales   : actualSales === null ? '' : Math.floor(actualSales * 100) / 100,
		notes         : notes === null ? `${dayName} ${mealPeriodName} ${categoryName} sales.` : notes
	};
	const [ formData, setFormData ] = useState(initialState);
	const [ hasChanged, setHasChanged ] = useState(false);
	const [ actualSaved, setActualSaved ] = useState(false);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
		if (
			name === 'expectedSales' &&
			value === initialState.expectedSales &&
			formData.actualSales === initialState.actualSales
		) {
			setHasChanged(false);
		}
		else if (
			name === 'actualSales' &&
			value === initialState.actualSales &&
			formData.expectedSales === initialState.expectedSales
		) {
			setHasChanged(false);
		}
		else {
			setHasChanged(true);
		}
		if (name === 'expectedSales') updateGroupExpectedSum(categoryId, value);
		if (name === 'actualSales') updateGroupActualSum(categoryId, value);
	};

	async function handleSubmit(evt) {
		evt.preventDefault();
		const data = { ...formData, restaurantId, mealPeriodCatId, date };
		try {
			let res;
			if (!data.mealPeriodCatId) {
				const mpcData = {
					salesPercentOfPeriod : 0,
					notes                : `${mealPeriodName} ${categoryName} sales percentage.`
				};
				const mpcRes = await dispatch(registerMealPeriodCat(mealPeriodId, categoryId, mpcData));
				if (mpcRes.status === 201) {
					data.mealPeriodCatId = mpcRes.data.mealPeriodCat.id;
				}
				else {
					console.log(mpcRes);
				}
			}
			if (status === 'new') {
				res = await dispatch(registerSale(data));
			}
			if (status === 'existing') {
				res = await dispatch(updateSale(id, data));
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
			console.log('handleSubmit() > register/updateCategory() error:', err);
		}
	}

	useEffect(
		() => {
			if (status === 'new' || formData.actualSales === '' || formData.actualSales === null) {
				setActualSaved(false);
			}
			else {
				setActualSaved(true);
			}
		},
		[ formData, status ]
	);

	return (
		<div className={index === 0 ? 'SalesInputForm' : 'SalesInputForm TopBorder'}>
			<span>{categoryName}</span>
			<form onSubmit={handleSubmit}>
				<div className="SaleInput Expected">
					<label htmlFor="expectedSales">Expected:</label>{' '}
					<input
						type="number"
						min="0"
						step=".01"
						id="expectedSales"
						value={formData.expectedSales}
						name="expectedSales"
						onChange={handleChange}
					/>
				</div>
				<div className="SaleInput Actual">
					<label htmlFor="actualSales">Actual:</label>{' '}
					<input
						className={actualSaved ? 'Saved' : 'Unsaved'}
						type="number"
						min="0"
						step=".01"
						id="actualSales"
						value={formData.actualSales}
						name="actualSales"
						onChange={handleChange}
					/>
				</div>
				<div className="SaveButtonDiv">{hasChanged && <button type="submit">Save</button>}</div>
			</form>
		</div>
	);
}
