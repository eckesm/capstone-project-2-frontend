// https://www.digitalocean.com/community/tutorials/react-modal-component

import React from 'react';

import CancelButton from '../buttons/CancelButton';

import './modal.css';

export default function Modal({ handleClose, show, children }) {
	const showHideClassName = show ? 'modal display-block' : 'modal display-none';

	return (
		<div className={showHideClassName}>
			<section className="modal-main">
				{children}
				<CancelButton onClick={handleClose} text="Close" />
			</section>
		</div>
	);
}
