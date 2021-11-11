import React from 'react';
import { useDispatch } from 'react-redux';

import useFields from '../../hooks/useFields';

import { updateExpense } from '../../actions/expenses';

import CancelButton from '../buttons/CancelButton';
import SubmitButton from '../buttons/SubmitButton';

import './expenses.css';

export default function EditExpenseForm({
	id,
	categoryId,
	amount,
	notes,
	categories = [],
	setExpense,
	setEditing,
	updateInvoiceTotal
}) {
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
				updateInvoiceTotal(id, Number(res.data.expense.amount));
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
		<div className="EditExpenseForm">
			<form className="EditExpenseFormContainer" onSubmit={handleSubmit}>
				<div className="EditExpenseContainer">
					{categories.length > 0 && (
						<div className="EditFormText Category">
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
					<input
						className="EditFormText Amount"
						type="number"
						step=".01"
						id="amount"
						value={formData.amount}
						name="amount"
						onChange={handleChange}
						required
					/>
					<textarea
						className="EditFormText Notes"
						type="text"
						id="notes"
						rows="1"
						cols="40"
						value={formData.notes}
						name="notes"
						onChange={handleChange}
					/>
				</div>
				<div className="ButtonGroup ExpenseButtonGroup">
					<SubmitButton text="Update" />
					<CancelButton text="Cancel" onClick={handleCancel} />
				</div>
			</form>
		</div>
	);
}
