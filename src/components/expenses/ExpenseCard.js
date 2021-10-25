import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import { deleteExpense } from '../../actions/expenses';
import { getNameFromId } from '../../helpers/filterArrays';

import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import EditExpenseForm from './EditExpenseForm';
import GoButton from '../buttons/GoButton';

export default function ExpenseCard({ savedExpense }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const active = useSelector(store => store.active);

	const [ expense, setExpense ] = useState(savedExpense);
	const [ editing, setEditing ] = useState(false);

	async function handleDelete() {
		try {
			const res = await dispatch(deleteExpense(expense.id));
			if (res.status === 200) {
				history.push(`/restaurants/${expense.restaurantId}/invoices/${expense.invoiceId}`);
			}
		} catch (err) {
			console.log('handleDelete() > deleteExpense() error:', err);
		}
	}

	return (
		<div>
			{!editing &&
			active && (
				<div>
					<div>
						<p>Category: {getNameFromId(active.categories, expense.categoryId)}</p>
						<p>Amount: {expense.amount}</p>
						{expense.notes && <p>{expense.notes}</p>}
					</div>
					<div>
						<EditButton onClick={() => setEditing(true)} text="Edit Expense" />
						<DeleteButton text="Delete Expense" onClick={handleDelete} />
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
					/>
				</div>
			)}
		</div>
	);
}
