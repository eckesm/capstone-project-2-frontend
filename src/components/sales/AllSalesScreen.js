import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { getAndStoreSales } from '../../actions/sales';
import { prepareSavedAndEstimatedSales } from '../../helpers/salesCalculations';
import { sortByObjectAttribute } from '../../helpers/sorting';

import SalesGroup from './SalesGroup';
import ArrowButton from '../buttons/ArrowButton';
import TodayButton from '../buttons/TodayButton';

import './sales.css';
import '../screen.css';
import '../buttons/buttons.css';

export default function AllSalesScreen() {
	const history = useHistory();
	const dispatch = useDispatch();

	const routeDate = useParams().date || new Date().toISOString().slice(0, 10);
	const active = useSelector(store => store.active);
	const { sales } = useSelector(store => store.sales);

	const [ preparedDailySales, setPreparedDailySales ] = useState([]);
	const [ date, setDate ] = useState('');
	const [ apiSent, setApiSent ] = useState(false);

	const handleChange = evt => {
		const { value } = evt.target;

		if (value !== date) {
			history.push(`/restaurants/${active.id}/sales/date/${value}`);
		}

		setApiSent(false);
		setDate(value);
	};

	// set date to today's date on load.
	useEffect(
		() => {
			setDate(routeDate);
			setApiSent(false);
		},
		[ routeDate ]
	);

	// when date changes, get and store entered sales.
	useEffect(
		async () => {
			if (active && !apiSent && date) {
				try {
					const res = await dispatch(getAndStoreSales(active.id, date));
					if (res.status === 200) {
						setApiSent(true);
					}
				} catch (err) {
					console.log('getAndStoreSales() error:', err);
				}
			}
		},
		[ date, active ]
	);

	useEffect(
		() => {
			if (active && date && sales) {
				const calculatedObject = prepareSavedAndEstimatedSales(
					sales,
					date,
					active.id,
					active.mealPeriods,
					active.defaultSales,
					active.categories,
					active.mealPeriod_categories
				);
				setPreparedDailySales(sortByObjectAttribute('name', calculatedObject));
			}
		},
		[ active, date, sales ]
	);

	function handlePreviousDay() {
		let newDate = new Date(date);
		newDate.setDate(newDate.getDate() - 1);
		history.push(`/restaurants/${active.id}/sales/date/${newDate.toISOString().slice(0, 10)}`);
	}
	function handleToday() {
		history.push(`/restaurants/${active.id}/sales/date/${new Date().toISOString().slice(0, 10)}`);
	}
	function handleNextDay() {
		let newDate = new Date(date);
		newDate.setDate(newDate.getDate() + 1);
		history.push(`/restaurants/${active.id}/sales/date/${newDate.toISOString().slice(0, 10)}`);
	}

	return (
		<div className="Window">
			<div className="AllSalesScreen Screen">
				<p className="ScreenTitle">Daily Sales</p>
				<div className="HeadingContainer">
					<div className="InputGroup">
						<label htmlFor="date">Date: </label>
						<input className="Centered" type="date" value={date} name="date" onChange={handleChange} />
					</div>
					<div className="ButtonGroup">
						<ArrowButton text="Previous Day" onClick={handlePreviousDay} direction="left" />
						<TodayButton text="Today" onClick={handleToday} />
						<ArrowButton text="Next Day" onClick={handleNextDay} direction="right" />
					</div>
				</div>

				<div className="MealPeriodCards">
					{active &&
						preparedDailySales.map(mp => {
							return (
								<SalesGroup
									key={`${mp.id}-${date}`}
									groupArray={mp.sales}
									categories={active.categories}
									mealPeriodName={mp.name}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}
