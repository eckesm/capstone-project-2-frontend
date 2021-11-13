import React from 'react';

import NewCategoryGroupForm from './NewCategoryGroupForm';

import '../screen.css';

export default function NewCategoryGroupScreen() {
	return (
		<div className="Window">
			<div className="NewCategoryGroupScreen Screen">
				<p className="ScreenTitle">New Category Group</p>
				<NewCategoryGroupForm />
			</div>
		</div>
	);
}
