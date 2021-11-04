export function prepareMealPeriodCats(mealPeriods, categories, mealPeriodCats) {
	const preparedArray = [];
	for (let i = 0; i < mealPeriods.length; i++) {
		let mp = mealPeriods[i].id;
		let mpObject = { id: mp, name: mealPeriods[i].name, categories: [] };
		let mpArray = [];
		for (let c = 0; c < categories.length; c++) {
			let cat = categories[c].id;
			let existing = mealPeriodCats.filter(mpc => mpc.mealPeriodId == mp && mpc.categoryId == cat)[0];
			if (existing) {
				existing.status = 'existing';
				mpArray.push(existing);
			}
			else {
				mpArray.push({
					mealPeriodId         : mp,
					categoryId           : cat,
					salesPercentOfPeriod : '0',
					notes                : null,
					status               : 'new'
				});
			}
		}
		mpObject.categories = mpArray;
		preparedArray.push(mpObject);
	}
	return preparedArray;
}
