import React from 'react';
import NewInvoiceForm from './NewInvoiceForm';

import '../screen.css';

export default function NewInvoiceScreen() {
	return (
		<div className="Window">
			<div className="Screen">
				<p className="ScreenTitle">New Invoice</p>
				<div className="Section">
					<NewInvoiceForm />
				</div>
			</div>
		</div>
	);
}
