export function prepareSavedAndEstimatedSales(
	savedDailySales,
	date,
	restaurantId,
	mealPeriods,
	defaultSales,
	categories,
	mealPeriodCats
) {
	const mergedSalesObject = [];
	// const mergedSalesArray = [];

	let dayId = new Date(date).getDay() + 1;

	for (let i = 0; i < mealPeriods.length; i++) {
		let mp = mealPeriods[i].id;
		let mpArray = [];

		let totalMPEstimate = 0;
		let existingDS = defaultSales.filter(ds => ds.mealPeriodId == mp && ds.dayId == dayId)[0];
		if (existingDS) totalMPEstimate = Number(existingDS.total);

		let mpObject = { id: mp, name: mealPeriods[i].name, sales: [] };

		for (let c = 0; c < categories.length; c++) {
			let cat = categories[c].id;

			// mergedSalesObject[mp] = { name: mpName, sales: [] };

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
				// mergedSalesArray.push(existingSale);
				mpArray.push(existingSale);
				// mergedSalesObject[mp].sales.push(existingSale);
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
				// mergedSalesArray.push(newSale);
				mpArray.push(newSale);
				// mergedSalesObject[mp].sales.push(newSale);
			}
		}
		mpObject.sales = mpArray;
		mergedSalesObject.push(mpObject);
		// mergedSalesObject[mp].sales = mpArray;
	}
	// return [ mergedSalesObject, mergedSalesArray ];
	return mergedSalesObject;
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
