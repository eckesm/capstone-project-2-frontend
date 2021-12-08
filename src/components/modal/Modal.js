// https://www.digitalocean.com/community/tutorials/react-modal-component

import React from 'react';

import CancelButton from '../buttons/CancelButton';

import './modal.css';

export default function Modal({ handleClose, show, children, confirmButton = null }) {
	const showHideClassName = show ? 'Modal DisplayBlock' : 'Modal DisplayNone';

	return (
		<div className={showHideClassName}>
			<section className="ModalMain">
				{children}
				<div className="ButtonGroup">
					{confirmButton}
					<CancelButton onClick={handleClose} text="Close" />
				</div>
			</section>
		</div>
	);
}
