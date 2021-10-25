export function filterCatGroupId(categories = [], catGroupId = null) {
	return categories.filter(c => c.catGroupId == catGroupId);
}

export function filterInvoiceId(expenses = [], invoiceId = null) {
	return expenses.filter(e => e.invoiceId == invoiceId);
}

export function getNameFromId(catGroups, catGroupId) {
	if (catGroupId) {
		try {
			return catGroups.filter(cg => cg.id == catGroupId)[0].name;
		} catch (err) {
			console.log(err);
		}
	}
	return false;
}

const daysOfWeek = [
	{ id: 1, name: 'Monday' },
	{ id: 2, name: 'Tuesday' },
	{ id: 3, name: 'Wednesday' },
	{ id: 4, name: 'Thursday' },
	{ id: 5, name: 'Friday' },
	{ id: 6, name: 'Saturday' },
	{ id: 7, name: 'Sunday' }
];

export function getDayOfWeekNameFromId(id) {
	if (id) {
		try {
			return daysOfWeek.filter(d => d.id == id)[0].name;
		} catch (err) {
			console.log(err);
		}
	}
	return false;
}
