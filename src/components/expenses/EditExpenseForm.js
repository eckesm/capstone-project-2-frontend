import React from 'react';
import { useDispatch } from 'react-redux';

import useFields from '../../hooks/useFields';

import { updateExpense } from '../../actions/expenses';

import CancelButton from '../buttons/EditButton';

export default function EditExpenseForm({ id, categoryId, amount, notes, categories = [], setExpense, setEditing }) {
	const dispatch = useDispatch();

	const initialState = {
		categoryId : categoryId,
		amount     : amount === null ? 0 : amount,
		notes      : notes === null ? '' : notes
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(updateExpense(id, formData));
			if (res.status === 200) {
				setExpense(res.data.expense);
				setEditing(false);
			}
			else if (res.status === 400 || res.status === 404 || res.status === 500) {
				console.log(res.message);
			}
			else {
				console.log(res);
			}
		} catch (err) {
			console.log('handleSubmit() > updateExpense() error:', err);
		}
	}

	function handleCancel(evt) {
		evt.preventDefault();
		setEditing(false);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{categories.length > 0 && (
					<div>
						<label htmlFor="categoryId">Category:</label>
						<select
							type="text"
							id="categoryId"
							value={formData.categoryId}
							name="categoryId"
							onChange={handleChange}
						>
							{categories.map(c => {
								return (
									<option key={c.id} value={c.id}>
										{c.name}
									</option>
								);
							})}
						</select>
					</div>
				)}
				<div>
					<label htmlFor="amount">Amount:</label>
					<input
						type="number"
						id="amount"
						value={formData.amount}
						name="amount"
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="notes">Description:</label>
					<input type="text" id="notes" value={formData.notes} name="notes" onChange={handleChange} />
				</div>
				<button type="submit">Update Expense</button>
				<CancelButton text="Don't Update" onClick={handleCancel} />
			</form>
		</div>
	);
}
