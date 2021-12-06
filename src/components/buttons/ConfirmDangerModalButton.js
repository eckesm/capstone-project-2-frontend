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

	function onConfirmClick() {
		onConfirm();
		setShowModal(false);
	}

	return (
		<div className="ModalButton">
			<WarningButton text={text} onClick={() => setShowModal(true)} />
			<Modal
				show={showModal}
				handleClose={() => setShowModal(false)}
				confirmButton={<ConfirmDangerButton text={confirmButtonText} onClick={onConfirmClick} />}
			>
				<p>{confirmText}</p>
			</Modal>
		</div>
	);
}
