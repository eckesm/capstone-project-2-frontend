import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import { getInvoiceApi } from '../../helpers/api';
import { deleteInvoice } from '../../actions/invoices';

import AddButton from '../buttons/AddButton';
import AllExpenses from '../expenses/AllExpenses';
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import EditInvoiceForm from './EditInvoiceForm';
import GoButton from '../buttons/GoButton';
import NewExpenseForm from '../expenses/NewExpenseForm';

import '../buttons/buttons.css';

export default function InvoiceDetail() {
	const dispatch = useDispatch();
	const history = useHistory();

	const { invoiceId } = useParams();

	const [ invoice, setInvoice ] = useState(null);
	const [ editing, setEditing ] = useState(false);
	const [ showNewExpenseForm, setShowNewExpenseForm ] = useState(false);
	const [ total, setTotal ] = useState(0);
	const [ expenseAmounts, setExpenseAmounts ] = useState({});

	function updateTotal(expenseId, value) {
		let newExpenseObject = { ...expenseAmounts };
		let newTotal = 0;

		newExpenseObject[expenseId] = value;
		setExpenseAmounts(newExpenseObject);
		Object.keys(newExpenseObject).forEach(k => {
			newTotal += Number(newExpenseObject[k]);
		});
		setTotal(newTotal);
	}

	useEffect(
		async () => {
			try {
				const res = await getInvoiceApi(invoiceId);
				if (res.status === 200) {
					setInvoice(res.data.invoice);
					const { expenses } = res.data.invoice;
					let expenseObject = {};
					let savedTotal = 0;
					expenses.forEach(e => {
						expenseObject[e.id] = Number(e.amount);
						savedTotal += Number(e.amount);
					});
					setExpenseAmounts(expenseObject);
					setTotal(savedTotal);
				}
			} catch (err) {
				console.log('getInvoiceApi() error:', err);
			}
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
						<p>Date: {new Date(invoice.date).toLocaleDateString('en-US')}</p>
						<p>Total: {(Math.round(total * 100) / 100).toFixed(2)}</p>
						<h3>Expenses</h3>
						<AllExpenses invoiceId={invoice.id} updateInvoiceTotal={updateTotal} />
						{showNewExpenseForm && (
							<NewExpenseForm
								invoiceId={invoice.id}
								setShowNewExpenseForm={setShowNewExpenseForm}
								updateInvoiceTotal={updateTotal}
							/>
						)}
						{invoice.notes && (
							<div>
								<h3>Notes:</h3>
								<p>{invoice.notes}</p>
							</div>
						)}
					</div>
					{invoice && (
						<div className="buttonGroup">
							<AddButton text="Add Expense" onClick={() => setShowNewExpenseForm(true)} />
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
