import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { deleteInvoice } from '../../actions/invoices';

import AddButton from '../buttons/AddButton';
import AllExpenses from '../expenses/AllExpenses';
import DeleteButton from '../buttons/DeleteButton';
import EditButton from '../buttons/EditButton';
import EditInvoiceForm from './EditInvoiceForm';
import GoButton from '../buttons/GoButton';
import NewExpenseForm from '../expenses/NewExpenseForm';

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
					<p className="ScreenTitle">{invoice.invoice}</p>
					<div className="HeadingContainer">
						<ul className="IgnoreList">
							<li className="InputGroup">
								<label>Vendor:</label>
								<span>{invoice.vendor}</span>
							</li>
							<li className="InputGroup">
								<label>Date:</label>
								<span>{new Date(invoice.date).toLocaleDateString('en-US')}</span>
							</li>
							<li className="InputGroup">
								<label>Total:</label>
								<span className='InvoiceTotalResult'>${(Math.round(total * 100) / 100).toLocaleString('en-US')}</span>
							</li>
						</ul>
					</div>
					<div className="Section">
						<p className="SectionTitle1">Expenses</p>
						<AllExpenses invoiceId={invoice.id} updateInvoiceTotal={updateTotal} />
						{showNewExpenseForm && (
							<NewExpenseForm
								invoiceId={invoice.id}
								setShowNewExpenseForm={setShowNewExpenseForm}
								updateInvoiceTotal={updateTotal}
							/>
						)}
					</div>
					{invoice.notes && (
						<div className="Section">
							<div className='InvoiceNotes'>
							<p className="SectionTitle4">Notes:</p>
							<p>{invoice.notes}</p>
						</div>
						</div>
					)}
					<div className="ButtonGroup">
						{!showNewExpenseForm && <AddButton text="Add Expense" onClick={() => setShowNewExpenseForm(true)} />}
						<EditButton onClick={() => setEditing(true)} text="Edit Invoice" />
						<DeleteButton text="Delete Invoice" onClick={handleDelete} />
						<GoButton
							text="All Invoices"
							onClick={() => history.push(`/restaurants/${invoice.restaurantId}/invoices`)}
						/>
					</div>
				</div>
			)}

			{editing && (
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
