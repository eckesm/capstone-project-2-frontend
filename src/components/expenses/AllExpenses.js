import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { filterInvoiceId } from '../../helpers/filterArrays';

import ExpenseCard from './ExpenseCard';

export default function AllExpenses({ invoiceId }) {
	const savedExpenses = useSelector(store => store.invoices.expenses);
	const [ expenses, setExpenses ] = useState([]);

	useEffect(
		() => {
			setExpenses(filterInvoiceId(savedExpenses, invoiceId));
		},
		[ savedExpenses ]
	);

	return (
		<div>
			{expenses.map(e => {
				return <ExpenseCard key={e.id} savedExpense={e} />;
			})}
		</div>
	);
}
