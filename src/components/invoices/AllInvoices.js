import React, { useEffect, useState } from 'react';

import { filterInvoiceId } from '../../helpers/filterArrays';
import { sortByDate } from '../../helpers/sorting';

import InvoiceCard from './InvoiceCard';

import './invoices.css';

export default function AllInvoices({ invoices = [], expenses = [], categories = [] }) {
	const [ displayInvoices, setDisplayInvoices ] = useState([]);

	useEffect(
		() => {
			setDisplayInvoices(sortByDate(invoices));
		},
		[ invoices ]
	);

	return (
		<div className="AllInvoices">
			{displayInvoices.map(i => {
				return (
					<InvoiceCard
						key={i.id}
						id={i.id}
						restaurantId={i.restaurantId}
						date={new Date(i.date).toLocaleDateString('en-US')}
						invoice={i.invoice}
						vendor={i.vendor}
						total={i.total}
						notes={i.notes}
						expenses={filterInvoiceId(expenses, i.id)}
						categories={categories}
					/>
				);
			})}
		</div>
	);
}
