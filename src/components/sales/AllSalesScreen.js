import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNameFromId, getDayOfWeekNameFromId } from '../../helpers/filterArrays';
import { getAndStoreSales } from '../../actions/sales';

import { prepareSavedAndEstimatedSales } from '../../helpers/calculations';
import { storeSalesWithEstimates } from '../../actions/sales';

import SalesInputForm from './SalesInputForm';

export default function AllSalesScreen() {
	const dispatch = useDispatch();

	const active = useSelector(store => store.active);
	const { sales } = useSelector(store => store.sales);

	const [ preparedDailySales, setPreparedDailySales ] = useState([]);
	const [ date, setDate ] = useState(new Date().toISOString().slice(0, 10));
	const [ apiSent, setApiSent ] = useState(false);

	const handleChange = evt => {
		const { value } = evt.target;
		setApiSent(false);
		setDate(value);
	};

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
				const calculatedArray = prepareSavedAndEstimatedSales(
					sales,
					date,
					active.id,
					active.mealPeriods,
					active.defaultSales,
					active.categories,
					active.mealPeriod_categories
				);
				setPreparedDailySales(calculatedArray);
				dispatch(storeSalesWithEstimates(calculatedArray));
			}
		},
		[ active, date, sales ]
	);

	return (
		<div>
			<h1>Daily Sales</h1>
			<div>
				<label htmlFor="date">Date:</label>
				<input type="date" value={date} name="date" onChange={handleChange} />
			</div>
			<div>
				{active &&
					preparedDailySales.map(ds => {
						return (
							<SalesInputForm
								key={`${ds.date}-${ds.mealPeriodId}-${ds.categoryId}`}
								mealPeriodName={getNameFromId(active.mealPeriods, ds.mealPeriodId)}
								categoryName={getNameFromId(active.categories, ds.categoryId)}
								dayName={getDayOfWeekNameFromId(ds.dayId)}
								dailySale={ds}
							/>
						);
					})}
			</div>
		</div>
	);
}
