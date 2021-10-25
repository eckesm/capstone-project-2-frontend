import React from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import AllInvoices from './AllInvoices';
import AddButton from '../buttons/AddButton';
import GoButton from '../buttons/GoButton';

export default function AllInvoicesScreen() {
	const history = useHistory();
	const { invoices, expenses } = useSelector(store => store.invoices);
	const active = useSelector(store => store.active);

	return (
		<div>
			<div>
				<h1>Invoices</h1>
				{invoices &&
				active && (
					<AddButton
						text="Add Invoice"
						onClick={() => history.push(`/restaurants/${active.id}/invoices/new`)}
					/>
				)}
				<GoButton text="Restaurant" onClick={() => history.push(`/restaurants/${active.id}`)} />
			</div>
			{invoices && <AllInvoices invoices={invoices} expenses={expenses} />}
		</div>
	);
}
