import { useState } from 'react';

export default function useFields(initialState) {
	const [ formData, setFormData ] = useState(initialState);

	const handleChange = e => {
		setFormData(formData => ({
			...formData,
			[e.target.name]: e.target.value
		}));
	};

	const resetFormData = () => {
		setFormData(initialState);
	};

	return [ formData, handleChange, resetFormData ];
}
