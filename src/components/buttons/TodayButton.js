import React from 'react';

import './buttons.css'

export default function TodayButton({ text, onClick, ...props }) {
	return (
		<button className='CustomButton' {...props} onClick={onClick}>
			<i className="far fa-calendar-day" /> Today
		</button>
	);
}
