import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFields from '../../hooks/useFields';

import { registerExpense } from '../../actions/expenses';

import SubmitButton from '../buttons/SubmitButton';
import CancelButton from '../buttons/CancelButton';

import './expenses.css';

export default function NewExpenseForm({ invoiceId, setShowNewExpenseForm, updateInvoiceTotal }) {
	const dispatch = useDispatch();
	const active = useSelector(store => store.active);

	const initialState = {
		categoryId : '',
		invoiceId  : invoiceId,
		amount     : 0,
		notes      : ''
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(registerExpense(active.id, formData));
			if (res.status === 201) {
				const { id, amount } = res.data.expense;
				updateInvoiceTotal(id, amount);
				setShowNewExpenseForm(false);
			}
			else if (res.status === 400 || res.status === 404 || res.status === 500) {
				console.log(res.message);
			}
			else {
				console.log(res);
			}
		} catch (err) {
			console.log('handleSubmit() > registerInvoice() error:', err);
		}
	}

	function hideNewExpenseForm() {
		setShowNewExpenseForm(false);
	}

	useEffect(
		() => {
			if (active.categories.length > 0) {
				formData.categoryId = active.categories[0].id;
			}
		},
		[ active ]
	);

	return (
		<div className="NewExpenseForm">
			<form className="NewExpenseFormContainer" onSubmit={handleSubmit}>
				<div className="NewExpenseContainer">
					{active &&
					active.categories.length > 0 && (
						<div className="NewFormText Category">
							<select
								type="text"
								id="categoryId"
								value={formData.categoryId}
								name="categoryId"
								onChange={handleChange}
							>
								{active.categories.map(c => {
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
						className="NewFormText Amount"
						type="number"
						id="amount"
						value={formData.amount}
						name="amount"
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<textarea
						className="NewFormText Notes"
						type="text"
						rows="1"
						cols="40"
						id="notes"
						value={formData.notes}
						name="notes"
						onChange={handleChange}
					/>
				</div>
				<div className="ButtonGroup ExpenseButtonGroup">
					<SubmitButton text="Add Expense" />
					<CancelButton onClick={hideNewExpenseForm} text="Cancel" />
				</div>
			</form>
		</div>
	);
}
