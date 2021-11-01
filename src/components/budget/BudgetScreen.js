import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import {
	getAndStoreBudgetSales,
	getAndStoreWeekExpenses,
	getAndStoreWeekInvoices,
	storeBudgetBlendedSales
} from '../../actions/budget';
import { prepareBlendedWeeklySales, prepareSalesToDate, prepareWeeklyExpenses } from '../../helpers/calculations';

export default function BudgetScreen() {
	const dispatch = useDispatch();
	const history = useHistory();

	const routeDate = useParams().date || new Date().toISOString().slice(0, 10);
	const active = useSelector(store => store.active);
	const { blended, expenses, sales } = useSelector(store => store.budget);

	const [ date, setDate ] = useState(routeDate);
	const [ salesApisSent, setsalesApisSent ] = useState(false);
	const [ reportDates, setReportDates ] = useState([]);
	const [ salesToDate, setSalesToDate ] = useState({});
	const [ salesRemaining, setSalesRemaining ] = useState({});
	const [ salesTotal, setSalesTotal ] = useState({});
	const [ weeklyExpenses, setWeeklyExpenses ] = useState({});

	const handleChange = evt => {
		const { value } = evt.target;

		if (value !== date) {
			history.push(`/restaurants/${active.id}/budget/date/${value}`);
		}

		setsalesApisSent(false);
		setDate(value);
	};

	function setNewReportDates() {
		let dayId = new Date(date).getDay() + 1;
		const newReportDates = [];
		for (let i = 1; i <= 7; i++) {
			let iDate = new Date(date);
			iDate.setDate(iDate.getDate() - (dayId - i));
			newReportDates.push(iDate.toISOString().slice(0, 10));
		}
		setReportDates(newReportDates);
	}

	useEffect(
		() => {
			setNewReportDates();
		},
		[ date ]
	);

	useEffect(
		async () => {
			if (active && date && !salesApisSent && reportDates.length > 0) {
				try {
					reportDates.forEach(async d => {
						const res = await dispatch(getAndStoreBudgetSales(active.id, d));
						if (res.status !== 200) {
							console.log(res);
						}
					});
					setsalesApisSent(true);
				} catch (err) {
					console.log('getAndStoreBudgetSales() error:', err);
				}
				try {
					const res = await dispatch(getAndStoreWeekInvoices(active.id, reportDates[0], reportDates[6]));
					if (res.status !== 200) {
						console.log(res);
					}
				} catch (err) {
					console.log('getAndStoreWeekInvoices() error:', err);
				}
				try {
					const res = await dispatch(getAndStoreWeekExpenses(active.id, reportDates[0], reportDates[6]));
					if (res.status !== 200) {
						console.log(res);
					}
				} catch (err) {
					console.log('getAndStoreWeekExpenses() error:', err);
				}
			}
		},
		[ active, reportDates ]
	);

	useEffect(
		async () => {
			reportDates.forEach(async d => {
				const dailySales = sales[d] || [];

				const blended = prepareBlendedWeeklySales(
					dailySales,
					d,
					active.id,
					active.mealPeriods,
					active.defaultSales,
					active.categories,
					active.mealPeriod_categories
				);
				await dispatch(storeBudgetBlendedSales(d, blended));
			});
		},
		[ sales ]
	);

	useEffect(
		() => {
			const [ categorySalesToDate, categorySalesRemaining, categorySalesTotal ] = prepareSalesToDate(
				date,
				blended
			);
			setSalesToDate(categorySalesToDate);
			setSalesRemaining(categorySalesRemaining);
			setSalesTotal(categorySalesTotal);
		},
		[ blended, date ]
	);

	useEffect(
		() => {
			const categoryExpenses = prepareWeeklyExpenses(expenses);
			setWeeklyExpenses(categoryExpenses);
		},
		[ expenses, date ]
	);

	return (
		<div>
			<h1>Budget Performance</h1>
			<div>
				<label htmlFor="date">Date:</label>
				<input type="date" value={date} name="date" onChange={handleChange} />
			</div>
			{active &&
			salesToDate && (
				<div>
					<h2>Sales To Date</h2>
					<ul>
						{active.categories.map(c => {
							return (
								<li key={c.id}>
									{c.name}: {salesToDate[c.id] || 0}
								</li>
							);
						})}
					</ul>
					<p>
						<Link to={`/restaurants/${active.id}/sales`}>Today's Sales</Link> are based on expected daily
						sales until actuals are entered. Sales for previous days are based on actuals ($0 for any
						category with no actual entry).
					</p>
				</div>
			)}
			{active &&
			salesRemaining && (
				<div>
					<h2>Expected Remaining Sales</h2>

					<ul>
						{active.categories.map(c => {
							return (
								<li key={c.id}>
									{c.name}: {salesRemaining[c.id] || 0}
								</li>
							);
						})}
					</ul>
					<p>
						{' '}
						Update <Link to={`/restaurants/${active.id}/default-sales`}>default sales</Link> settings to
						change the default expected sales for each meal period by day.
					</p>
					<p>
						{' '}
						Update <Link to={`/restaurants/${active.id}/sales-percentages`}>sales percentage</Link> settings
						to change how sales are distributed between categories by meal period.
					</p>
				</div>
			)}
			{active &&
			salesTotal && (
				<div>
					<h2>Total Expected Weekly Sales</h2>
					<ul>
						{active.categories.map(c => {
							return (
								<li key={c.id}>
									{c.name}: {salesTotal[c.id] || 0}
								</li>
							);
						})}
					</ul>
				</div>
			)}
			{active && (
				<div>
					<h2>COGS %</h2>
					<ul>
						{active.categories.map(c => {
							return (
								<li key={c.id}>
									<Link to={`/restaurants/${active.id}/categories/${c.id}`}>{c.name}</Link>:{' '}
									{(Math.round((c.cogsPercent || 0) * 10000) / 100).toFixed(2)}%
								</li>
							);
						})}
					</ul>
					<p>
						Update COGS percentage settings to change the amount of expense bugeted for each sales category.
					</p>
				</div>
			)}
			{active &&
			salesTotal && (
				<div>
					<h2>Total Budget</h2>
					<ul>
						{active.categories.map(c => {
							return (
								<li key={c.id}>
									{c.name}:{' '}
									{(Math.round((salesTotal[c.id] || 0) * c.cogsPercent * 100) / 100).toFixed(2)}
								</li>
							);
						})}
					</ul>
				</div>
			)}
			{active &&
			weeklyExpenses && (
				<div>
					<h2>Weekly Spending</h2>
					<ul>
						{active.categories.map(c => {
							return (
								<li key={c.id}>
									{c.name}: {(Math.round((weeklyExpenses[c.id] || 0) * 100) / 100).toFixed(2)}
								</li>
							);
						})}
					</ul>
					<p>
						Add, update, or delete <Link to={`/restaurants/${active.id}/invoices`}>invoices</Link> to adjust
						spending for the week.
					</p>
				</div>
			)}
			{active &&
			salesTotal &&
			weeklyExpenses && (
				<div>
					<h2>Remaining Budget</h2>
					<ul>
						{active.categories.map(c => {
							return (
								<li key={c.id}>
									{c.name}:{' '}
									{(Math.round(
										((salesTotal[c.id] || 0) * c.cogsPercent - (weeklyExpenses[c.id] || 0)) * 100
									) / 100).toFixed(2)}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
