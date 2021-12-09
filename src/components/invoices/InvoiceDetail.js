import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { deleteInvoice } from '../../actions/invoices';

import AllExpenses from '../expenses/AllExpenses';
import EditInvoiceForm from './EditInvoiceForm';
import NewExpenseForm from '../expenses/NewExpenseForm';

import AddButton from '../buttons/AddButton';
import EditButton from '../buttons/EditButton';
import GoButton from '../buttons/GoButton';
import ConfirmDangerModalButton from '../buttons/ConfirmDangerModalButton';

import '../screen.css';

export default function InvoiceDetail({ invoice, setInvoice }) {
	const dispatch = useDispatch();
	const history = useHistory();

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

	useEffect(async () => {
		const { expenses } = invoice;
		let expenseObject = {};
		let savedTotal = 0;
		expenses.forEach(e => {
			expenseObject[e.id] = Number(e.amount);
			savedTotal += Number(e.amount);
		});
		setExpenseAmounts(expenseObject);
		setTotal(savedTotal);
	}, []);

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
		<div className="InvoiceDetail">
			{!editing && (
				<div>
					<div className="InvoiceExpensesAndNotes Section">
						<p className="ScreenTitle">{invoice.invoice}</p>
						<div className="InvoiceHeadingContainer">
							<span className="">
								<b>Vendor</b>: <span>{invoice.vendor}</span>
							</span>
							<span className="">
								<b>Date</b>: <span>{new Date(invoice.date).toLocaleDateString('en-US')}</span>
							</span>
							<span className="">
								<b>Total</b>:{' '}
								<span className="InvoiceTotalResult">
									${(Math.round(total * 100) / 100).toLocaleString('en-US')}
								</span>
							</span>
						</div>
						<AllExpenses invoiceId={invoice.id} updateInvoiceTotal={updateTotal} />
						{showNewExpenseForm && (
							<NewExpenseForm
								invoiceId={invoice.id}
								setShowNewExpenseForm={setShowNewExpenseForm}
								updateInvoiceTotal={updateTotal}
							/>
						)}
						{invoice.notes && (
							<div className="NotesContainer">
								<b>Notes</b>: <span className="Notes">{invoice.notes}</span>
							</div>
						)}
					</div>
					<div className="ButtonGroup">
						{!showNewExpenseForm && (
							<AddButton text="Add Expense" onClick={() => setShowNewExpenseForm(true)} />
						)}
						<EditButton onClick={() => setEditing(true)} text="Edit Invoice" />
						<ConfirmDangerModalButton
							onConfirm={handleDelete}
							text="Delete Invoice"
							confirmText={
								'Are you sure you would like to delete this invoice?  This action cannot be undone.'
							}
							confirmButtonText="Confirm Delete"
						/>
						<GoButton
							text="All Invoices"
							onClick={() => history.push(`/restaurants/${invoice.restaurantId}/invoices`)}
						/>
					</div>
				</div>
			)}

			{editing && (
				<div>
					<p className="ScreenTitle">Edit Invoice</p>
					<div className="Section">
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
				</div>
			)}
		</div>
	);
}
