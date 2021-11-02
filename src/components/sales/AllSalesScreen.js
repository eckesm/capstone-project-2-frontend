import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { getNameFromId } from '../../helpers/filterArrays';
import { getAndStoreSales } from '../../actions/sales';

import { prepareSavedAndEstimatedSales } from '../../helpers/calculations';
import { storeSalesWithEstimates } from '../../actions/sales';

import SalesGroup from './SalesGroup';

export default function AllSalesScreen() {
	const history = useHistory();
	const dispatch = useDispatch();

	const routeDate = useParams().date || new Date().toISOString().slice(0, 10);
	const active = useSelector(store => store.active);
	const { sales } = useSelector(store => store.sales);

	const [ preparedDailySales, setPreparedDailySales ] = useState({});

	const [ date, setDate ] = useState(routeDate);
	const [ apiSent, setApiSent ] = useState(false);

	const handleChange = evt => {
		const { value } = evt.target;

		if (value !== date) {
			history.push(`/restaurants/${active.id}/sales/date/${value}`);
		}

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
				const [ calculatedObject, calculatedArray ] = prepareSavedAndEstimatedSales(
					sales,
					date,
					active.id,
					active.mealPeriods,
					active.defaultSales,
					active.categories,
					active.mealPeriod_categories
				);
				setPreparedDailySales(calculatedObject);
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
					Object.keys(preparedDailySales).map(mp => {
						return (
							<SalesGroup
								key={`${mp}-${date}`}
								groupArray={preparedDailySales[mp]}
								categories={active.categories}
								mealPeriodName={getNameFromId(active.mealPeriods, mp)}
								// categoryName={getNameFromId(active.categories, mp.categoryId)}
							/>
						);
					})}
			</div>
		</div>
	);
}
