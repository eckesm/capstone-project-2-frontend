import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { deleteExpense } from '../../actions/expenses';
import { getNameFromId } from '../../helpers/filterArrays';

import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import EditExpenseForm from './EditExpenseForm';

import './expenses.css';
import '../buttons/buttons.css';

export default function ExpenseCard({ index, savedExpense, updateInvoiceTotal }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const active = useSelector(store => store.active);

	const [ expense, setExpense ] = useState(savedExpense);
	const [ editing, setEditing ] = useState(false);

	async function handleDelete() {
		try {
			const res = await dispatch(deleteExpense(expense.id));
			if (res.status === 200) {
				// history.push(`/restaurants/${expense.restaurantId}/invoices/${expense.invoiceId}`);
				updateInvoiceTotal(expense.id, 0);
			}
		} catch (err) {
			console.log('handleDelete() > deleteExpense() error:', err);
		}
	}

	return (
		<div className={index === 0 ? 'ExpenseCard' : 'ExpenseCard TopBorder'}>
			{!editing &&
			active && (
				<div className="ExpenseContainer">
					<div className="ExpenseInfoContainer">
						<p className="ExpenseText Category">{getNameFromId(active.categories, expense.categoryId)}</p>
						<p className="ExpenseText Amount">
							{(Math.round(Number(expense.amount) * 100, 2) / 100).toFixed(2).toLocaleString('en-US')}
						</p>
						<p className="ExpenseText Notes">{expense.notes}</p>
					</div>
					<div className="buttonGroup ExpenseButtonGroup">
						<EditButton onClick={() => setEditing(true)} text="Edit" />
						<DeleteButton text="Delete" onClick={handleDelete} />
					</div>
				</div>
			)}

			{editing &&
			active && (
				<div>
					<EditExpenseForm
						id={expense.id}
						categoryId={expense.categoryId}
						amount={expense.amount}
						notes={expense.notes}
						categories={active.categories}
						setExpense={setExpense}
						setEditing={setEditing}
						updateInvoiceTotal={updateInvoiceTotal}
					/>
				</div>
			)}
		</div>
	);
}
