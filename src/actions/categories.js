import { BackendApi } from '../api/api';

import { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from './types';

export function registerCategory(id, data) {
	return async function(dispatch) {
		data.restaurantId = id;
		if (data.catGroupId === '' || data.catGroupId === '0') {
			delete data.catGroupId;
		}
		if (data.cogsPercent === '') {
			data.cogsPercent = 0;
		}
		else {
			data.cogsPercent = Number(data.cogsPercent);
		}
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.postCategoryApi(data);
		if (res.status === 201) {
			const {category} = res.data
			await dispatch({
				type     : ADD_CATEGORY,
				category
			});
		}
		return res;
	};
}

export function updateCategory(id, data) {
	return async function(dispatch) {
		if (data.catGroupId === '' || data.catGroupId === '0') {
			delete data.catGroupId;
		}
		if (data.cogsPercent === '') {
			data.cogsPercent = 0.0;
		}
		else {
			data.cogsPercent = Number(data.cogsPercent);
		}
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.putCategoryApi(id, data);
		if (res.status === 200) {
			const { category } = res.data;
			await dispatch({
				type     : UPDATE_CATEGORY,
				category
			});
		}
		return res;
	};
}

export function deleteCategory(id) {
	return async function(dispatch) {
		const res = await BackendApi.deleteCategoryApi(id);
		if (res.status === 200) {
			const { deleted } = res.data;
			await dispatch({
				type    : DELETE_CATEGORY,
				deleted
			});
		}
		return res;
	};
}
