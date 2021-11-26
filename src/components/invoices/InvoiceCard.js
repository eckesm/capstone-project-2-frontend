import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { getNameFromId } from '../../helpers/filterArrays';
import { sortByNameFromTag } from '../../helpers/sorting';
import { shortenWithEllipse } from '../../helpers/textAdjustments';

import '../screen.css';
import './invoices.css';

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
		return Math.round(total * 100) / 100;
	}

	function handleClick() {
		history.push(`/restaurants/${restaurantId}/invoices/${id}`);
	}

	useEffect(() => {
		setDisplayExpenses(sortByNameFromTag('categoryId', expenses, categories));
	}, []);

	return (
		<div className="InvoiceCard Card BackgroundHover ShadowHover" onClick={handleClick}>
			<p className="SectionTitle2">{invoice}</p>
			<div className="HeadingContainer">
				<ul className="IgnoreList">
					<li className="InputGroup">
						<label>Vendor:</label>
						<span>{vendor}</span>
					</li>
					<li className="InputGroup">
						<label>Date:</label>
						<span>{date}</span>
					</li>
					<li className="InputGroup">
						<label>Total:</label>
						<span>${getTotal().toLocaleString('en-US')}</span>
					</li>
				</ul>
			</div>
			{displayExpenses.length > 0 && (
				<div className='Expenses'>
					<p className="SectionTitle4 MarinTop10px">Expenses</p>
					<ul className="IgnoreList">
						{displayExpenses.map(e => {
							return (
								<li key={e.id} className="InputGroup">
									<label>{shortenWithEllipse(getNameFromId(categories, e.categoryId),30)}:</label>
									<span>${Number(e.amount).toLocaleString('en-US')}</span>{' '}
									{/* {e.notes && <span className="Notes">({e.notes})</span>} */}
								</li>
							);
						})}
					</ul>
				</div>
			)}
			{notes && (
				<div>
					<p className="SectionTitle4 MarinTop10px">Notes:</p>
					<p className="Notes">{notes}</p>
				</div>
			)}
		</div>
	);
}
