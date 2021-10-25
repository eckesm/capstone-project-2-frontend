import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerDefaultSale, updateDefaultSale, deleteDefaultSale } from '../../actions/defaultSales';

export default function DefaultSalesInputForm({ mealPeriodName, dayName, dailySale }) {
	const dispatch = useDispatch();

	const { id = null, restaurantId, mealPeriodId, dayId, total = null, notes = null, status = null } = dailySale;

	const initialState = {
		total : total === null ? 0 : Math.floor(total),
		notes : notes === null ? `${dayName} ${mealPeriodName} sales.` : notes
	};
	const [ formData, setFormData ] = useState(initialState);
	const [ hasChanged, setHasChanged ] = useState(false);

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
	};

	async function handleSubmit(evt) {
		evt.preventDefault();
		const data = { ...formData, dayId, mealPeriodId, restaurantId };
		try {
			let res;
			if (status === 'new') {
				if (formData.total !== '0') {
					res = await dispatch(registerDefaultSale(data));
				}
				else {
					console.log('cannot create 0');
					return false;
				}
			}
			if (status === 'existing') {
				if (formData.total === '0') {
					res = await dispatch(deleteDefaultSale(id));
				}
				else {
					data.id = id;
					res = await dispatch(updateDefaultSale(data));
				}
			}

			if (res.status === 200 || res.status === 201) {
				console.log(res.data);
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

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="total">
					{dayName} {mealPeriodName}:
				</label>
				<input
					type="number"
					min="0"
					step="1"
					id="total"
					value={formData.total}
					name="total"
					onChange={handleChange}
					required
				/>
				{hasChanged && <button type="submit">Save</button>}
			</form>
		</div>
	);
}
