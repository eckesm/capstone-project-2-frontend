import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { filterInvoiceId } from '../../helpers/filterArrays';

import ExpenseCard from './ExpenseCard';

import './expenses.css';

export default function AllExpenses({ invoiceId, updateInvoiceTotal }) {
	const savedExpenses = useSelector(store => store.invoices.expenses);
	const [ expenses, setExpenses ] = useState([]);

	useEffect(
		() => {
			setExpenses(filterInvoiceId(savedExpenses, invoiceId));
		},
		[ savedExpenses ]
	);

	return (
		<div className="AllExpenses">
			<div className="TableTitles">
				<div className="TableInfoContainer">
					<p className="TableTitleText Category">
						<b className="TableTitle">Category</b>
					</p>
					<p className="TableTitleText Amount">
						<b className="TableTitle">Amount</b>
					</p>
					<p className="TableTitleText Notes">
						<b className="TableTitle">Description</b>
					</p>
				</div>
				<div className="ButtonGroup" />
			</div>
			{expenses.map((e, idx) => {
				return <ExpenseCard key={e.id} index={idx} savedExpense={e} updateInvoiceTotal={updateInvoiceTotal} />;
			})}
		</div>
	);
}
