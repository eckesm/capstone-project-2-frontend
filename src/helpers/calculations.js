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

export function prepareBlendedWeeklySales(
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

export function prepareSalesToDate(date, blendedSales) {
	const salesToDate = {};
	const salesRemaining = {};
	const salesTotal = {};
	for (const day in blendedSales) {
		const dailySales = blendedSales[day];
		dailySales.forEach(ds => {
			if (new Date(day) < new Date(date)) {
				let existingToDateValue = salesToDate[ds.categoryId] || 0;
				salesToDate[ds.categoryId] = existingToDateValue + Number(ds.actualSales);
			}
			else if ((day == date)) {
				// else if (new Date(day) == new Date(date)) {
				let existingToDateValue = salesToDate[ds.categoryId] || 0;
				salesToDate[ds.categoryId] = existingToDateValue + Number(ds.budgetSales);
			}
			else {
				let existingRemainingValue = salesRemaining[ds.categoryId] || 0;
				salesRemaining[ds.categoryId] = existingRemainingValue + Number(ds.budgetSales);
			}
			let existingTotalValue = salesTotal[ds.categoryId] || 0;
			salesTotal[ds.categoryId] = existingTotalValue + Number(ds.budgetSales);
		});
	}

	return [ salesToDate, salesRemaining, salesTotal ];
}

export function prepareWeeklyExpenses(expensesArray) {
	const expenses = {};
	expensesArray.forEach(e => {
		let existingValue = expenses[e.categoryId] || 0;
		expenses[e.categoryId] = existingValue + Number(e.amount);
	});

	return expenses;
}
