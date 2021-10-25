import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';

import { getInvoiceApi } from '../../helpers/api';
import { deleteInvoice } from '../../actions/invoices';

import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import EditInvoiceForm from './EditInvoiceForm';
import GoButton from '../buttons/GoButton';

export default function InvoiceDetail() {
	const dispatch = useDispatch();
	const history = useHistory();

	const { invoiceId } = useParams();
	// const { expenses } = useSelector(store => store.invoices);

	const [ invoice, setInvoice ] = useState(null);
	const [ editing, setEditing ] = useState(false);

	useEffect(
		async () => {
			const res = await getInvoiceApi(invoiceId);
			setInvoice(res.data.invoice);
		},
		[ invoiceId ]
	);

	async function handleDelete() {
		try {
			const res = await dispatch(deleteInvoice(invoice.id));
			if (res.status === 200) {
				history.push(`/restaurants/${invoice.restaurantId}/invoices`);
			}
		} catch (err) {
			console.log('handleDelete() > deleteInvoice() error:', err);
		}
	}

	return (
		<div>
			{invoice &&
			!editing && (
				<div>
					<h1>{invoice.invoice}</h1>
					<div>
						<p>Vendor: {invoice.vendor}</p>
						<p>Date: {invoice.date}</p>
						<p>Total: {invoice.total}</p>
						<h3>Expenses</h3>
						<ul>
							{invoice.expenses.map(e => {
								return (
									<li key={e.id}>
										{e.notes} (${e.amount})
									</li>
								);
							})}
						</ul>
						{invoice.notes && (
							<div>
								<h3>Notes:</h3>
								<p>{invoice.notes}</p>
							</div>
						)}
					</div>
					{invoice && (
						<div>
							<EditButton onClick={() => setEditing(true)} text="Edit Invoice" />
							<DeleteButton text="Delete Invoice" onClick={handleDelete} />
							<GoButton
								text="All Invoices"
								onClick={() => history.push(`/restaurants/${invoice.restaurantId}/invoices`)}
							/>
						</div>
					)}
				</div>
			)}

			{invoice &&
			editing && (
				<div>
					<h1>Edit Invoice</h1>
					<EditInvoiceForm
						id={invoice.id}
						date={invoice.date}
						invoice={invoice.invoice}
						vendor={invoice.vendor}
						total={invoice.total}
						notes={invoice.notes}
						expenses={invoice.expenses}
						setInvoice={setInvoice}
						setEditing={setEditing}
					/>
				</div>
			)}
		</div>
	);
}
