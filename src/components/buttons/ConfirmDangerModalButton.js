// https://www.digitalocean.com/community/tutorials/react-modal-component

import React, { useState } from 'react';

import Modal from '../modal/Modal';
import WarningButton from './WarningButton';
import ConfirmDangerButton from './ConfirmDangerButton';

import './buttons.css';

export default function ConfirmDangerModalButton({
	text,
	onConfirm,
	confirmText = 'Confirm action? This cannot be undone.',
	confirmButtonText = 'Confirm'
}) {
	const [ showModal, setShowModal ] = useState(false);

	async function onConfirmClick() {
		onConfirm();
		setShowModal(false);
	}

	return (
		<div className="ModalButton">
			<WarningButton text={text} onClick={() => setShowModal(!showModal)} />
			<Modal show={showModal} handleClose={() => setShowModal(false)}>
				<p>{confirmText}</p>
				<ConfirmDangerButton text={confirmButtonText} onClick={onConfirmClick} />
			</Modal>
		</div>
	);
}
