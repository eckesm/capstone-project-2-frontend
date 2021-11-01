import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import { getNameFromId } from '../../helpers/filterArrays';
import { sortByNameFromTag } from '../../helpers/sorting';

import './InvoiceCard.css';

export default function InvoiceCard({
	id,
	restaurantId,
	date,
	invoice,
	vendor,
	notes = [],
	expenses = [],
	categories = []
}) {
	const history = useHistory();

	const [ displayExpenses, setDisplayExpenses ] = useState([]);

	function getTotal() {
		let total = 0;
		for (let i = 0; i < expenses.length; i++) {
			total += Number(expenses[i].amount);
		}
		return (Math.round(total * 100) / 100).toFixed(2);
	}

	function handleClick() {
		history.push(`/restaurants/${restaurantId}/invoices/${id}`);
	}

	useEffect(() => {
		setDisplayExpenses(sortByNameFromTag('categoryId', expenses, categories));
	}, []);

	return (
		<div className="InvoiceCard" onClick={handleClick}>
			<p className="InvoiceName">{invoice}</p>
			{/* <Link to={`/restaurants/${restaurantId}/invoices/${id}`}>Go to Invoice {invoice}</Link> */}
			<ul>
				<li>
					<b>Vendor</b>: {vendor}
				</li>
				<li>
					<b>Date</b>: {date}
				</li>
				<li>
					<b>Total</b>: ${getTotal()}
				</li>
			</ul>
			{displayExpenses.length > 0 && (
				<div>
					<p className="SectionTitle">Expenses</p>
					<ul>
						{displayExpenses.map(e => {
							return (
								<li key={e.id}>
									<b>{getNameFromId(categories, e.categoryId)}</b>: {e.notes} (${e.amount})
								</li>
							);
						})}
					</ul>
				</div>
			)}
			{/* <Link to={`/restaurants/${restaurantId}/categories/${id}`}>Go to {name}.</Link> */}
			{notes && (
				<div>
					<p className="SectionTitle">Notes:</p>
					<p className='Notes'>{notes}</p>
				</div>
			)}
		</div>
	);
}
