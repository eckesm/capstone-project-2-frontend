import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerDefaultSale, updateDefaultSale, deleteDefaultSale } from '../../actions/defaultSales';

import './defaultSales.css';

export default function DefaultSalesInputForm({
	mealPeriodName,
	dayName,
	defaultSale,
	updateGroupSum,
	isAdmin = false,
	index
}) {
	const dispatch = useDispatch();

	const { id = null, restaurantId, mealPeriodId, dayId, total = null, notes = null, status = null } = defaultSale;

	const initialState = {
		total : total === null ? 0 : Math.floor(total),
		notes : notes === null ? `${dayName} ${mealPeriodName} sales.` : notes
	};
	const [ formData, setFormData ] = useState(initialState);
	const [ hasChanged, setHasChanged ] = useState(false);
	const [ hasSaved, setHasSaved ] = useState(false);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
		if (name === 'total' && value == initialState.total && formData.notes == initialState.notes) {
			setHasChanged(false);
		}
		else {
			setHasChanged(true);
		}
		if (name === 'total') updateGroupSum(mealPeriodId, value);
	};

	async function handleSubmit(evt) {
		evt.preventDefault();

		if (hasChanged) {
			const data = { ...formData, dayId, mealPeriodId, restaurantId };
			try {
				let res;
				if (status === 'new') {
					if (formData.total !== '' || formData.total !== '0') {
						res = await dispatch(registerDefaultSale(data));
					}
					else {
						return false;
					}
				}
				if (status === 'existing') {
					if (formData.total === '' || formData.total === '0') {
						res = await dispatch(deleteDefaultSale(id));
					}
					else {
						data.id = id;
						res = await dispatch(updateDefaultSale(data.id, data));
					}
				}
				if (res.status === 200 || res.status === 201) {
					setHasChanged(false);
					setHasSaved(true);
					setTimeout(() => {
						setHasSaved(false);
					}, 1000);
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

	useEffect(() => {
		updateGroupSum(mealPeriodId, Number(total));
	}, []);

	function determineDivClassName() {
		if (index === 0) {
			return `DefaultSalesInputForm First`;
		}
		if (index % 2 === 0) {
			return `DefaultSalesInputForm Even`;
		}
		else {
			return `DefaultSalesInputForm Odd`;
		}
	}

	function determineInputClassName() {
		if (hasChanged) {
			return `UnsavedSale BackgroundHover`;
		}
		else if (hasSaved) {
			return `SavedSale BackgroundHover`;
		}
		else {
			return `BackgroundHover`;
		}
	}

	return (
		<div className={determineDivClassName()}>
			<form onSubmit={handleSubmit} onBlur={handleSubmit} className="InputGroup">
				<input
					className={determineInputClassName()}
					type="number"
					min="0"
					step="1"
					id="total"
					value={formData.total}
					name="total"
					onChange={handleChange}
					disabled={isAdmin ? false : true}
					required
				/>
			</form>
		</div>
	);
}
