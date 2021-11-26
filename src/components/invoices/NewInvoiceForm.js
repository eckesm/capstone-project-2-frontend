import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { registerInvoice } from '../../actions/invoices';

import AddButton from '../buttons/AddButton'

import './invoices.css';

export default function NewInvoiceForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const active = useSelector(store => store.active);

	const initialState = {
		invoice : '',
		date    : new Date().toISOString().slice(0, 10),
		vendor  : '',
		total   : '0',
		notes   : ''
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(registerInvoice(active.id, formData));
			if (res.status === 201) {
				history.push(`/restaurants/${active.id}/invoices/${res.data.invoice.id}`);
			}
			else if (res.status === 400 || res.status === 404 || res.status === 500) {
				console.log(res.message);
			}
			else {
				console.log(res);
			}
		} catch (err) {
			console.log('handleSubmit() > registerInvoice() error:', err);
		}
	}

	return (
		<form className="NewInvoiceForm" onSubmit={handleSubmit}>
			<div className="InputGroup">
				<label htmlFor="invoice">Invoice Number:</label>
				<input
					type="text"
					id="invoice"
					value={formData.invoice}
					name="invoice"
					onChange={handleChange}
					required
				/>
			</div>
			<div className="InputGroup">
				<label htmlFor="date">Date:</label>
				<input className='Date' type="date" id="date" value={formData.date} name="date" onChange={handleChange} required />
			</div>
			<div className="InputGroup">
				<label htmlFor="vendor">Vendor:</label>
				<input
					className="Vendor"
					type="text"
					id="vendor"
					value={formData.vendor}
					name="vendor"
					onChange={handleChange}
					required
				/>
			</div>
			<div className="InputGroup">
				<label htmlFor="notes">Notes:</label>
				<textarea
					type="text"
					id="notes"
					value={formData.notes}
					name="notes"
					onChange={handleChange}
					rows="5"
					cols="50"
				/>
			</div>
			<AddButton text='Add Invoice' onClick={handleSubmit} />
		</form>
	);
}
