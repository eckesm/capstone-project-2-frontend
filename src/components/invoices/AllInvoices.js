import React from 'react';

import { filterInvoiceId } from '../../helpers/filterArrays';

import InvoiceCard from './InvoiceCard';

export default function AllInvoices({ invoices = [], expenses = [] }) {
	return (
		<div>
			{invoices.map(i => {
				return (
					<InvoiceCard
						key={i.id}
						id={i.id}
						restaurantId={i.restaurantId}
						date={i.date}
						invoice={i.invoice}
						vendor={i.vendor}
						total={i.total}
						notes={i.notes}
						expenses={filterInvoiceId(expenses, i.id)}
					/>
				);
			})}
		</div>
	);
}
