import React from 'react';
import { Link } from 'react-router-dom';

import { getNameFromId } from '../../helpers/filterArrays';

export default function InvoiceCard({
	id,
	restaurantId,
	date,
	invoice,
	vendor,
	total,
	notes = [],
	expenses = [],
	categories = []
}) {
	return (
		<div>
			<h2>{invoice}</h2>
			<Link to={`/restaurants/${restaurantId}/invoices/${id}`}>Go to Invoice {invoice}</Link>
			<ul>
				<li>Vendor: {vendor}</li>
				<li>Date: {date}</li>
				<li>Total: {total}</li>
			</ul>
			<h4>Expenses</h4>
			<ul>
				{expenses.map(e => {
					return (
						<li key={e.id}>
							<b>{getNameFromId(categories, e.categoryId)}</b>: {e.notes} (${e.amount})
						</li>
					);
				})}
			</ul>
			{/* <Link to={`/restaurants/${restaurantId}/categories/${id}`}>Go to {name}.</Link> */}
			{notes && (
				<div>
					<h4>Notes:</h4>
					<p>{notes}</p>
				</div>
			)}
		</div>
	);
}
