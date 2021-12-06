import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BackendApi } from '../../api/api';

import InvoiceDetail from './InvoiceDetail';

import './invoices.css';
import '../screen.css';

export default function InvoiceDetailScreen() {
	const { invoiceId } = useParams();
	const [ invoice, setInvoice ] = useState(null);

	useEffect(
		async () => {
			try {
				const res = await BackendApi.getInvoiceApi(invoiceId);
				if (res.status === 200) {
					setInvoice(res.data.invoice);
				}
			} catch (err) {
				console.log('getInvoiceApi() error:', err);
			}
		},
		[ invoiceId ]
	);

	return (
		<div className="Window">
			<div className="Screen">{invoice && <InvoiceDetail invoice={invoice} setInvoice={setInvoice} />}</div>
		</div>
	);
}
