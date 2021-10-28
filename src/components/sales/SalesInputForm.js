import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerSale, updateSale, deleteSale } from '../../actions/sales';
import { registerMealPeriodCat } from '../../actions/mealPeriodCats';

import './SalesInputForm.css';

export default function SalesInputForm({ mealPeriodName, categoryName, dayName, dailySale }) {
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
		dayId,
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
	};

	async function handleSubmit(evt) {
		evt.preventDefault();
		const data = { ...formData, restaurantId, mealPeriodCatId, date };
		try {
			let res;
			if (status === 'new') {
				if (!data.mealPeriodCatId) {
					const mpcData = {
						salesPercentOfPeriod : 0,
						notes                : `${mealPeriodName} ${categoryName} sales percentage.`
					};
					const mpcRes = await dispatch(registerMealPeriodCat(mealPeriodId, categoryId, mpcData));
					if (mpcRes.status === 201) {
						data.mealPeriodCatId = mpcRes.data.mealPeriodCatId;
					}
					else {
						console.log(mpcRes);
					}
				}

				// if (formData.expectedSales != '0' || formData.actualSales != '0') {
				res = await dispatch(registerSale(data));
				// }
				// else {
				// console.log('cannot create 0');
				// return false;
				// }
			}
			if (status === 'existing') {
				// if (formData.expectedSales == '0' && formData.actualSales == '0') {
				// 	res = await dispatch(deleteSale(id));
				// }
				// else {
				res = await dispatch(updateSale(id, data));
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
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="expectedSales">
					{mealPeriodName} {categoryName} EXPECTED:
				</label>
				<input
					type="number"
					min="0"
					step=".01"
					id="expectedSales"
					value={formData.expectedSales}
					name="expectedSales"
					onChange={handleChange}
				/>
				<label htmlFor="actualSales">
					{mealPeriodName} {categoryName} ACTUAL:
				</label>
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
				{hasChanged && <button type="submit">Save</button>}
			</form>
		</div>
	);
}
