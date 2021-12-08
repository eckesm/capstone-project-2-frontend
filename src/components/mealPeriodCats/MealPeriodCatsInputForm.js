import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerMealPeriodCat, updateMealPeriodCat } from '../../actions/mealPeriodCats';

import ErrorMessages from '../errorMessages/ErrorMessages';
import Modal from '../modal/Modal';

import './mealPeriodCats.css';

export default function MealPeriodCatsInputForm({
	mealPeriodName,
	categoryName,
	mealPeriodCat,
	updateGroupSum,
	isAdmin = false,
	index
}) {
	const dispatch = useDispatch();

	const {
		id = null,
		mealPeriodId,
		categoryId,
		salesPercentOfPeriod = null,
		notes = null,
		status = null
	} = mealPeriodCat;

	const initialState = {
		salesPercentOfPeriod : salesPercentOfPeriod === null ? 0 : salesPercentOfPeriod,
		notes                : notes === null ? `${mealPeriodName} ${categoryName} sales percentage.` : notes
	};
	const [ formData, setFormData ] = useState(initialState);
	const [ hasChanged, setHasChanged ] = useState(false);
	const [ hasSaved, setHasSaved ] = useState(false);
	const [ errors, setErrors ] = useState([]);
	const [ showModal, setShowModal ] = useState(false);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
		if (
			name === 'salesPercentOfPeriod' &&
			value == initialState.salesPercentOfPeriod &&
			formData.notes == initialState.notes
		) {
			setHasChanged(false);
		}
		else {
			setHasChanged(true);
		}

		if (name === 'salesPercentOfPeriod') updateGroupSum(`${mealPeriodId}-${categoryId}`, value);
	};

	async function handleSubmit(evt) {
		evt.preventDefault();

		if (hasChanged) {
			const data = { ...formData };
			data.salesPercentOfPeriod = String(Math.round(Number(data.salesPercentOfPeriod) * 10000) / 10000);
			try {
				let res;
				if (status === 'new') {
					res = await dispatch(registerMealPeriodCat(mealPeriodId, categoryId, data));
				}
				if (status === 'existing') {
					res = await dispatch(updateMealPeriodCat(mealPeriodId, categoryId, data));
				}

				if (res.status === 200 || res.status === 201) {
					setFormData(data => ({
						...data,
						salesPercentOfPeriod : String(Math.round(Number(data.salesPercentOfPeriod) * 10000) / 10000)
					}));
					setErrors([]);
					setHasChanged(false);
					setHasSaved(true);
					setTimeout(() => {
						setHasSaved(false);
					}, 1000);
				}
				else if (res.status === 400) {
					setErrors(res.message);
					setShowModal(true);
				}
				else {
					console.log(res);
				}
			} catch (err) {
				console.log('handleSubmit() > register/MealPeriodCat() error:', err);
			}
		}
	}

	useEffect(() => {
		updateGroupSum(`${mealPeriodId}-${categoryId}`, Number(salesPercentOfPeriod));
	}, []);

	function determineDivClassName() {
		if (index === 0) {
			return `MealPeriodCatsInputForm First`;
		}
		else {
			if (index % 2 === 0) {
				return `MealPeriodCatsInputForm Even`;
			}
			else {
				return `MealPeriodCatsInputForm Odd`;
			}
		}
	}
	function determineInputClassName() {
		if (hasChanged) {
			return `UnsavedSale BackgroundHover`;
		}
		else if (hasSaved) {
			return `SavedSale BackgroundHover`;
		}
		else {
			return `BackgroundHover`;
		}
	}

	return (
		<div className={determineDivClassName()}>
			<form onSubmit={handleSubmit} onBlur={handleSubmit} className="InputGroup">
				<input
					className={determineInputClassName()}
					type="number"
					step=".0001"
					min="0"
					max="1"
					id="salesPercentOfPeriod"
					value={formData.salesPercentOfPeriod}
					name="salesPercentOfPeriod"
					onChange={handleChange}
					disabled={isAdmin ? false : true}
					required
				/>
			</form>
			<Modal show={showModal} handleClose={() => setShowModal(false)}>
				<p className='SectionTitle2'>ERROR!</p>
				<p>
					<ErrorMessages errors={errors} />
				</p>
			</Modal>
		</div>
	);
}
