import React from 'react';
import { useDispatch } from 'react-redux';

import useFields from '../../hooks/useFields';

import { updateInvoice } from '../../actions/invoices';

import CancelButton from '../buttons/EditButton';

export default function EditInvoiceForm({
	id,
	date,
	invoice,
	vendor,
	total,
	notes,
	expenses = [],
	setInvoice,
	setEditing
}) {
	const dispatch = useDispatch();

	const initialState = {
		invoice : invoice,
		date    : date,
		vendor  : vendor,
		total   : total,
		notes   : notes === null ? '' : notes
	};
	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			const res = await dispatch(updateInvoice(id, formData));
			if (res.status === 200) {
				setInvoice(res.data.invoice);
				setEditing(false);
			}
			else if (res.status === 400 || res.status === 404 || res.status === 500) {
				console.log(res.message);
			}
			else {
				console.log(res);
			}
		} catch (err) {
			console.log('handleSubmit() > updateCategory() error:', err);
		}
	}

	function handleCancel(evt) {
		evt.preventDefault();
		setEditing(false);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
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
				<div>
					<label htmlFor="date">Date:</label>
					<input type="date" id="date" value={formData.date} name="date" onChange={handleChange} required />
				</div>
				<div>
					<label htmlFor="vendor">Vendor:</label>
					<input
						type="text"
						id="vendor"
						value={formData.vendor}
						name="vendor"
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label htmlFor="notes">Notes:</label>
					<input type="text" id="notes" value={formData.notes} name="notes" onChange={handleChange} />
				</div>
				<button type="submit">Update Invoice</button>
				<CancelButton text="Don't Update" onClick={handleCancel} />
			</form>
		</div>
	);
}