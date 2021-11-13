import React from 'react';

import NewCategoryForm from './NewCategoryForm';

import '../screen.css';

export default function NewCategoryScreen() {
	return (
		<div className="Window">
			<div className="NewCategoryScreen Screen">
				<p className="ScreenTitle">New Category</p>
				<NewCategoryForm />
			</div>
		</div>
	);
}
