export function prepareSavedAndEstimatedSales(
	savedDailySales,
	date,
	restaurantId,
	mealPeriods,
	defaultSales,
	categories,
	mealPeriodCats
) {
	const mergedSalesObject = {};
	const mergedSalesArray = [];

	let dayId = new Date(date).getDay() + 1;

	for (let i = 0; i < mealPeriods.length; i++) {
		let mp = mealPeriods[i].id;
		let mpArray = [];

		let totalMPEstimate = 0;
		let existingDS = defaultSales.filter(ds => ds.mealPeriodId == mp && ds.dayId == dayId)[0];
		if (existingDS) totalMPEstimate = Number(existingDS.total);

		for (let c = 0; c < categories.length; c++) {
			let cat = categories[c].id;

			let existingMPC = mealPeriodCats.filter(mpc => mpc.mealPeriodId == mp && mpc.categoryId == cat)[0];
			let salesPercentOfPeriod = 0;
			if (existingMPC) salesPercentOfPeriod = Number(existingMPC.salesPercentOfPeriod);

			let existingSale = false;
			if (existingMPC) {
				existingSale = savedDailySales.filter(
					s => s.mealPeriodCatId == existingMPC.id && s.date.substring(0, 10) == date.substring(0, 10)
				)[0];
			}

			if (existingSale) {
				existingSale.dayId = dayId;
				existingSale.mealPeriodId = mp;
				existingSale.categoryId = cat;
				existingSale.mealPeriodCatId = existingMPC ? existingMPC.id : null;
				existingSale.status = 'existing';
				mergedSalesArray.push(existingSale);
				mpArray.push(existingSale);
			}
			else {
				let newSale = {
					date,
					dayId,
					restaurantId,
					mealPeriodId    : mp,
					categoryId      : cat,
					mealPeriodCatId : existingMPC ? existingMPC.id : null,
					expectedSales   : totalMPEstimate * salesPercentOfPeriod,
					actualSales     : null,
					notes           : null,
					status          : 'new'
				};
				mergedSalesArray.push(newSale);
				mpArray.push(newSale);
			}
		}
		mergedSalesObject[mp] = mpArray;
	}
	return [ mergedSalesObject, mergedSalesArray ];
}

export function generateReportDatesArray(date) {
	let dayId = new Date(date).getDay() + 1;
	const newReportDates = [];
	for (let i = 1; i <= 7; i++) {
		let iDate = new Date(date);
		iDate.setDate(iDate.getDate() - (dayId - i));
		newReportDates.push(iDate.toISOString().slice(0, 10));
	}
	return newReportDates;
}

export function prepareBudgetReportFigures(
	date,
	reportDates,
	savedSales,
	restaurantId,
	mealPeriods,
	defaultSales,
	categories,
	mealPeriodCats,
	weeklyExpenses
) {
	const blendedWeeklySales = {};

	reportDates.forEach(d => {
		const dailySales = savedSales[d] || [];

		const blended = prepareBlendedWeeklySales(
			dailySales,
			d,
			restaurantId,
			mealPeriods,
			defaultSales,
			categories,
			mealPeriodCats
		);
		blendedWeeklySales[d] = blended;
	});

	const [ salesToDate, salesRemaining, salesTotal ] = prepareBlendedSalesFigures(date, blendedWeeklySales);
	const preparedWeeklyExpenses = prepareWeeklyExpenses(weeklyExpenses);

	const budgetFiguresObject = generateBudgetFiguresObject(
		categories,
		salesTotal,
		salesToDate,
		salesRemaining,
		preparedWeeklyExpenses
	);
	return budgetFiguresObject;
}

function prepareBlendedWeeklySales(
	savedDailySales,
	date,
	restaurantId,
	mealPeriods,
	defaultSales,
	categories,
	mealPeriodCats
) {
	const blendedWeeklySales = [];

	let dayId = new Date(date).getDay() + 1;

	for (let i = 0; i < mealPeriods.length; i++) {
		let mp = mealPeriods[i].id;

		let totalMPEstimate = 0;
		let existingDS = defaultSales.filter(ds => ds.mealPeriodId == mp && ds.dayId == dayId)[0];
		if (existingDS) totalMPEstimate = Number(existingDS.total);

		for (let c = 0; c < categories.length; c++) {
			let cat = categories[c].id;

			let existingMPC = mealPeriodCats.filter(mpc => mpc.mealPeriodId == mp && mpc.categoryId == cat)[0];
			let salesPercentOfPeriod = 0;
			if (existingMPC) salesPercentOfPeriod = Number(existingMPC.salesPercentOfPeriod);

			let existingSale = false;
			if (existingMPC) {
				existingSale = savedDailySales.filter(
					s => s.mealPeriodCatId == existingMPC.id && s.date.substring(0, 10) == date.substring(0, 10)
				)[0];
			}

			let budgetSales = totalMPEstimate * salesPercentOfPeriod;
			if (existingSale) {
				if (existingSale.actualSales !== null) {
					budgetSales = existingSale.actualSales;
				}
				else if (existingSale.expectedSales !== null) {
					budgetSales = existingSale.expectedSales;
				}
				else {
					budgetSales = 0;
				}
			}

			blendedWeeklySales.push({
				date,
				dayId,
				restaurantId,
				mealPeriodId    : mp,
				categoryId      : cat,
				mealPeriodCatId : existingMPC ? existingMPC.id : null,
				expectedSales   : existingSale ? existingSale.expectedSales : totalMPEstimate * salesPercentOfPeriod,
				actualSales     : existingSale ? existingSale.actualSales : null,
				budgetSales,
				notes           : existingSale ? existingSale.notes : null
			});
		}
	}
	return blendedWeeklySales;
}

function prepareBlendedSalesFigures(date, blendedSales) {
	const salesToDate = {};
	const salesRemaining = {};
	const salesTotal = {};
	for (const day in blendedSales) {
		const dailySales = blendedSales[day];
		dailySales.forEach(ds => {
			let existingTotalValue = salesTotal[ds.categoryId] || 0;
			let existingToDateValue = salesToDate[ds.categoryId] || 0;
			let existingRemainingValue = salesRemaining[ds.categoryId] || 0;
			if (new Date(day) < new Date(date)) {
				// previous days in the week use actual values or $0.
				salesToDate[ds.categoryId] = existingToDateValue + Number(ds.actualSales);
				salesTotal[ds.categoryId] = existingTotalValue + Number(ds.actualSales);
			}
			else if (day == date) {
				// today uses expected values unless actuals are entered.
				salesToDate[ds.categoryId] = existingToDateValue + Number(ds.budgetSales);
				salesTotal[ds.categoryId] = existingTotalValue + Number(ds.budgetSales);
			}
			else {
				// future days use expected values.
				salesRemaining[ds.categoryId] = existingRemainingValue + Number(ds.expectedSales);
				salesTotal[ds.categoryId] = existingTotalValue + Number(ds.expectedSales);
			}
		});
	}

	return [ salesToDate, salesRemaining, salesTotal ];
}

function prepareWeeklyExpenses(expensesArray) {
	const expenses = {};
	expensesArray.forEach(e => {
		let existingValue = expenses[e.categoryId] || 0;
		expenses[e.categoryId] = existingValue + Number(e.amount);
	});

	return expenses;
}

function generateBudgetFiguresObject(categories, salesTotal, salesToDate, salesRemaining, weeklyExpenses) {
	const categoryFigures = {};

	categories.map(c => {
		let figures = {};
		figures.remainingBudget = Math.round((salesTotal[c.id] || 0) * c.cogsPercent - (weeklyExpenses[c.id] || 0));
		figures.toDate = Math.round(salesToDate[c.id] || 0);
		figures.expectedRemaining = Math.round(salesRemaining[c.id] || 0);
		figures.totalExpectedWeekly = Math.round(salesTotal[c.id] || 0);
		figures.cogsPercent = c.cogsPercent || 0;
		figures.totalBudget = Math.round((salesTotal[c.id] || 0) * c.cogsPercent);
		figures.weeklySpending = Math.round(weeklyExpenses[c.id] || 0);

		categoryFigures[c.id] = figures;
	});
	return categoryFigures;
}

// https://www.tutorialspoint.com/check-if-values-of-two-arrays-are-the-same-equal-in-javascript
export function checkEquivalentArrays(array1, array2) {
	if (array1.length !== array2.length) {
		return false;
	}
	for (let i = 0; i < array1.length; i++) {
		if (!array2.includes(array1[i])) {
			return false;
		}
	}
	return true;
}
