import { getNameFromId } from './filterArrays';

export function sortByObjectAttribute(tag, arrayToSort) {
	return arrayToSort.sort((a, b) => {
		var textA = a[tag];
		var textB = b[tag];
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
}

export function sortByNameFromTag(tag, arrayToSort, itemsSortedAgainst) {
	return arrayToSort.sort((a, b) => {
		var textA = getNameFromId(itemsSortedAgainst, a[tag]);
		var textB = getNameFromId(itemsSortedAgainst, b[tag]);
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
}

export function sortByDate(arrayToSort) {
	return arrayToSort.sort((a, b) => {
		var dateA = new Date(a.date);
		var dateB = new Date(b.date);
		return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
	});
}

export function sortByItem(array) {
	return array.sort((a, b) => {
		var textA = a.toUpperCase();
		var textB = b.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
}
