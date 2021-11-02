import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { prepareBudgetReportFigures, generateReportDatesArray } from '../../helpers/budgetCalculations';
import { getBudgetSales, getSavedExpenses } from '../../helpers/api';

import './BudgetScreen.css';

export default function BudgetScreen() {
	const history = useHistory();

	const routeDate = useParams().date || new Date().toISOString().slice(0, 10);

	const active = useSelector(store => store.active);

	const [ date, setDate ] = useState();
	const [ reportDates, setReportDates ] = useState([]);
	const [ apiSentGetSavedSales, setApiSentGetSavedSales ] = useState(false);
	const [ savedSales, setSavedSales ] = useState({});
	const [ savedExpenses, setSavedExpenses ] = useState([]);
	const [ budgetFigures, setBudgetFigures ] = useState(null);

	const handleChange = evt => {
		const { value } = evt.target;

		if (date) {
			if (value !== date) {
				history.push(`/restaurants/${active.id}/budget/date/${value}`);
			}
			setApiSentGetSavedSales(false);
			setDate(value);
		}
	};

	// set date to today's date on load.
	useEffect(() => {
		setDate(routeDate);
	}, []);

	// set new report dates when the date changes.
	useEffect(
		() => {
			if (date) {
				// builds and sets an array of dates that should be included in the budget report.
				setReportDates(generateReportDatesArray(date));
			}
		},
		[ date ]
	);

	// when report dates change, get and store entered sales, invoices, and expenses for the determined report dates.
	useEffect(
		async () => {
			if (active && !apiSentGetSavedSales && reportDates.length > 0) {
				try {
					const buildSavedSales = {};
					let count = 0;
					reportDates.forEach(async d => {
						const res = await getBudgetSales(active.id, d);
						if (res.status !== 200) {
							console.log(res);
						}
						else {
							count += 1;
							buildSavedSales[d] = res.data.sales;

							if (count === reportDates.length) {
								setSavedSales(buildSavedSales);
							}
						}
					});
					setApiSentGetSavedSales(true);
				} catch (err) {
					console.log('getBudgetSales() error:', err);
				}

				try {
					const res = await getSavedExpenses(active.id, reportDates[0], reportDates[6]);
					if (res.status !== 200) {
						console.log(res);
					}
					else {
						setSavedExpenses(res.data.expenses);
					}
				} catch (err) {
					console.log('getSavedExpenses() error:', err);
				}
			}
		},
		[ reportDates, active ]
	);

	// when all entered sales and expenses have been retrieved, create budget report figures for date and relevant date range.
	useEffect(
		() => {
			if (active && savedSales && savedExpenses) {
				const budgetReportFigures = prepareBudgetReportFigures(
					date,
					reportDates,
					savedSales,
					active.id,
					active.mealPeriods,
					active.defaultSales,
					active.categories,
					active.mealPeriod_categories,
					savedExpenses
				);
				setBudgetFigures(budgetReportFigures);
			}
		},
		[ savedSales, savedExpenses, active ]
	);

	return (
		<div className="BudgetScreen">
			<div>
				<p className="PageTitle">Budget Performance</p>
				<div>
					<label htmlFor="date">Date:</label>
					<input type="date" value={date} name="date" onChange={handleChange} required />
				</div>
			</div>
			{active &&
			budgetFigures && (
				<div className="BudgetPerformanceCard">
					<p className="SectionTitle">Remaining Budget</p>
					<ul>
						{active.categories.map(c => {
							let budget = budgetFigures[c.id].remainingBudget;
							return (
								<li key={c.id}>
									<span className="CategoryName">{c.name}</span>:{' '}
									<span className={budget < 0 ? 'negative' : 'positive'}>
										{budget.toLocaleString('en-US')}
									</span>
								</li>
							);
						})}
					</ul>
					<div className="Notes">
						<p>
							The remaining budget is the difference between the Total Budget and the Weekly Spending
							(based on entered invoices) for a given category.
						</p>
					</div>
				</div>
			)}
			<div className="PerformanceCards">
				{active &&
				budgetFigures && (
					<div className="PerformanceCard">
						<p className="SectionTitle">Sales To Date</p>
						<ul>
							{active.categories.map(c => {
								return (
									<li key={c.id}>
										<span className="CategoryName">{c.name}</span>:{' '}
										{budgetFigures[c.id].toDate.toLocaleString('en-US')}
									</li>
								);
							})}
						</ul>
						<div className="Notes">
							<p>
								<Link to={`/restaurants/${active.id}/sales`}>Today's sales</Link> are based on expected
								daily sales until actuals are entered.
							</p>
							<p>
								{' '}
								Sales for previous days are based on actuals ($0 for any category with no actual entry).
							</p>
							<p>
								Sales for future days are based on expected sales regardless of whether actuals have
								been entered (this enables a user to see what budgets looked like in the past based on
								past expectations).
							</p>
						</div>
					</div>
				)}
				{active &&
				budgetFigures && (
					<div className="PerformanceCard">
						<p className="SectionTitle">Expected Remaining Sales</p>

						<ul>
							{active.categories.map(c => {
								return (
									<li key={c.id}>
										<span className="CategoryName">{c.name}</span>:{' '}
										{budgetFigures[c.id].expectedRemaining.toLocaleString('en-US')}
									</li>
								);
							})}
						</ul>
						<div className="Notes">
							<p>
								Expected remaining sales do not include today's expected sales; today's expected sales
								are included in Sales to Date unless they are replaced by actuals.
							</p>
							<p>
								{' '}
								Update <Link to={`/restaurants/${active.id}/default-sales`}>default sales</Link>{' '}
								settings to change the default expected sales for each meal period by day. Overwrite
								default sales on a given day on the{' '}
								<Link to={`/restaurants/${active.id}/sales`}>daily sales</Link> screen.
							</p>
							<p>
								{' '}
								Update <Link to={`/restaurants/${active.id}/sales-percentages`}>
									sales percentage
								</Link>{' '}
								settings to change how sales are distributed between categories by meal period.
							</p>
						</div>
					</div>
				)}
				{active &&
				budgetFigures && (
					<div className="PerformanceCard">
						<p className="SectionTitle">Total Expected Weekly Sales</p>
						<ul>
							{active.categories.map(c => {
								return (
									<li key={c.id}>
										<span className="CategoryName">{c.name}</span>:{' '}
										{budgetFigures[c.id].totalExpectedWeekly.toLocaleString('en-US')}
									</li>
								);
							})}
						</ul>
					</div>
				)}
				{active &&
				budgetFigures && (
					<div className="PerformanceCard">
						<p className="SectionTitle">COGS %</p>
						<ul>
							{active.categories.map(c => {
								return (
									<li key={c.id}>
										<Link to={`/restaurants/${active.id}/categories/${c.id}`}>
											<span className="CategoryName">{c.name}</span>
										</Link>: {(budgetFigures[c.id].cogsPercent * 100).toFixed(2)}%
									</li>
								);
							})}
						</ul>
						<div className="Notes">
							<p>
								Update COGS percentage settings to change the amount of expense bugeted for each sales
								category.
							</p>
						</div>
					</div>
				)}
				{active &&
				budgetFigures && (
					<div className="PerformanceCard">
						<p className="SectionTitle">Total Budget</p>
						<ul>
							{active.categories.map(c => {
								return (
									<li key={c.id}>
										<span className="CategoryName">{c.name}</span>:{' '}
										{budgetFigures[c.id].totalBudget.toLocaleString('en-US')}
									</li>
								);
							})}
						</ul>
						<div className="Notes">
							<p>
								The total budget is the product of the Total Expected Weekly Sales and the budgeted COGS
								percentage for a given category.
							</p>
						</div>
					</div>
				)}
				{active &&
				budgetFigures && (
					<div className="PerformanceCard">
						<p className="SectionTitle">Weekly Spending</p>
						<ul>
							{active.categories.map(c => {
								return (
									<li key={c.id}>
										<span className="CategoryName">{c.name}</span>:{' '}
										{budgetFigures[c.id].weeklySpending.toLocaleString('en-US')}
									</li>
								);
							})}
						</ul>
						<div className="Notes">
							<p>
								Add, update, or delete <Link to={`/restaurants/${active.id}/invoices`}>
									invoices
								</Link>{' '}
								to adjust spending for the week.
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
