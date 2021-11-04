import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import useFields from '../../hooks/useFields';

import { sortByItem } from '../../helpers/sorting';

import AllInvoices from './AllInvoices';
import AddButton from '../buttons/AddButton';

import './invoices.css';

export default function AllInvoicesScreen() {
	const history = useHistory();
	const { invoices, expenses } = useSelector(store => store.invoices);
	const active = useSelector(store => store.active);

	const [ displayInvoices, setDisplayInvoices ] = useState([]);
	const [ vendorChoices, setVendorChoices ] = useState([]);

	const initialState = {
		startDate : new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
		endDate   : new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
		vendor    : ''
	};

	const [ formData, handleChange, resetFormData ] = useFields(initialState);

	useEffect(
		() => {
			if (invoices) {
				let invoiceArray = [ ...invoices ];

				if (formData.startDate) {
					invoiceArray = invoiceArray.filter(
						inv => new Date(inv.date) >= new Date(new Date(formData.startDate).getTime())
					);
				}

				if (formData.endDate) {
					invoiceArray = invoiceArray.filter(
						inv =>
							new Date(inv.date) <=
							new Date(new Date(formData.endDate).getTime() + 1 * 24 * 60 * 60 * 1000)
					);
				}

				if (formData.vendor) {
					invoiceArray = invoiceArray.filter(inv => inv.vendor === formData.vendor);
				}

				setDisplayInvoices(invoiceArray);

				if (vendorChoices.length === 0) {
					const vendorChoicesArray = [];
					for (let i = 0; i < invoices.length; i++) {
						if (!vendorChoices.includes(invoices[i].vendor)) vendorChoicesArray.push(invoices[i].vendor);
					}
					setVendorChoices(sortByItem(vendorChoicesArray));
				}
			}
		},
		[ formData, invoices ]
	);

	return (
		<div className="AllInvoicesScreen">
			<div>
				<h1>Invoices</h1>
				<div>
					<label htmlFor="startDate">Start Date:</label>
					<input
						type="date"
						id="startDate"
						value={formData.startDate}
						name="startDate"
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor="endDate">End Date:</label>
					<input type="date" id="endDate" value={formData.endDate} name="endDate" onChange={handleChange} />
				</div>
				<div>
					<label htmlFor="vendor">Vendor:</label>
					<select type="text" id="vendor" value={formData.vendor} name="vendor" onChange={handleChange}>
						<option key="0" value="">
							ALL VENDORS
						</option>
						{vendorChoices.map((v, i) => {
							return (
								<option key={i} value={v}>
									{v}
								</option>
							);
						})}
					</select>
				</div>
				{invoices &&
				active && (
					<AddButton
						text="Add Invoice"
						onClick={() => history.push(`/restaurants/${active.id}/invoices/new`)}
					/>
				)}
			</div>
			{invoices &&
			active && <AllInvoices invoices={displayInvoices} expenses={expenses} categories={active.categories} />}
		</div>
	);
}
