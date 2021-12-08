import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { registerSale, updateSale } from '../../actions/sales';
import { registerMealPeriodCat } from '../../actions/mealPeriodCats';
import { shortenWithEllipse } from '../../helpers/textAdjustments';

import './sales.css';
import '../screen.css';

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
		status = null,
		justAdded = false
	} = dailySale;

	const initialState = {
		expectedSales : expectedSales === null ? 0 : Math.round(expectedSales * 100) / 100,
		actualSales   : actualSales === null ? '' : Math.round(actualSales * 100) / 100,
		notes         : notes === null ? `${dayName} ${mealPeriodName} ${categoryName} sales.` : notes
	};
	const [ formData, setFormData ] = useState(initialState);
	const [ actualChanged, setActualChanged ] = useState(false);
	const [ expectedChanged, setExpectedChanged ] = useState(false);
	const [ actualSaved, setActualSaved ] = useState(justAdded ? true : false);
	const [ expectedSaved, setExpectedSaved ] = useState(justAdded ? true : false);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
		if (name === 'expectedSales') {
			if (value === initialState.expectedSales) {
				setExpectedChanged(false);
			}
			else {
				setExpectedChanged(true);
			}
		}

		if (name === 'actualSales') {
			if (value === initialState.actualSales) {
				setActualChanged(false);
			}
			else {
				setActualChanged(true);
			}
		}

		if (name === 'expectedSales') updateGroupExpectedSum(categoryId, value);
		if (name === 'actualSales') updateGroupActualSum(categoryId, value);
	};

	async function handleSubmit(evt) {
		evt.preventDefault();

		if (expectedChanged || actualChanged) {
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
					if (expectedChanged) {
						setExpectedSaved(true);
					}
					if (actualChanged) {
						setActualSaved(true);
					}
					if (status === 'existing') {
						setExpectedChanged(false);
						setActualChanged(false);
						setTimeout(() => {
							setExpectedSaved(false);
							setActualSaved(false);
						}, 1000);
					}
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
	}

	function determineDivClassName() {
		if (index === 0) {
			return `SalesInputForm`;
		}
		return `SalesInputForm TopBorder`;
	}

	function determineExpectedInputClassName() {
		if (expectedChanged) {
			return `Unsaved BackgroundHover`;
		}
		else if (expectedSaved) {
			return `Saved BackgroundHover`;
		}
		else {
			return `BackgroundHover`;
		}
	}

	function determineActualInputClassName() {
		if (formData.actualSales === '' || formData.actualSales === null) {
			return `Missing BackgroundHover`;
		}
		if (actualChanged) {
			return `Unsaved BackgroundHover`;
		}
		else if (actualSaved) {
			return `Saved BackgroundHover`;
		}
		else {
			return `BackgroundHover`;
		}
	}

	useEffect(
		() => {
			if (justAdded) {
				setTimeout(() => {
					setExpectedSaved(false);
					setActualSaved(false);
				}, 1000);
			}
		},
		[ justAdded ]
	);
	return (
		<div className={determineDivClassName()}>
			<span>{shortenWithEllipse(categoryName, 20)}</span>
			<form onSubmit={handleSubmit} onBlur={handleSubmit}>
				<div className="SaleInput Expected">
					<label htmlFor="expectedSales">Expected:</label>{' '}
					<input
						className={determineExpectedInputClassName()}
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
						className={determineActualInputClassName()}
						type="number"
						min="0"
						step=".01"
						id="actualSales"
						value={formData.actualSales}
						name="actualSales"
						onChange={handleChange}
					/>
				</div>
			</form>
		</div>
	);
}
