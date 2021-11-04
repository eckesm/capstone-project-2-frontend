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
			<div className="HeadingContainer">
				<div className="HeadingInfoContainer">
					<p className="HeadingText Category">
						<b className="HeadingTitle">Category</b>
					</p>
					<p className="HeadingText Amount">
						<b className="HeadingTitle">Amount</b>
					</p>
					<p className="HeadingText Notes">
						<b className="HeadingTitle">Description</b>
					</p>
				</div>
				<div className="buttonGroup" />
			</div>
			{expenses.map((e, idx) => {
				return <ExpenseCard key={e.id} index={idx} savedExpense={e} updateInvoiceTotal={updateInvoiceTotal} />;
			})}
		</div>
	);
}
