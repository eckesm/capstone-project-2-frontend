import { makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from '../helpers/api';

import { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from './types';

export function registerCategory(id, data) {
	return async function(dispatch) {
		try {
			data.restaurantId = id;
			if (data.catGroupId === '0') {
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

			const res = await makePostRequest(`categories`, data);
			if (res.status === 201) {
				const category = res.data.category;
				await dispatch({
					type     : ADD_CATEGORY,
					category
				});
			}
			return res;
		} catch (err) {
			console.log('registerCategory() error:', err);
		}
	};
}

export function updateCategory(id, data) {
	return async function(dispatch) {
		try {
			if (data.catGroupId === '0') {
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

			const res = await makePutRequest(`categories/${id}`, data);
			if (res.status === 200) {
				const { category } = res.data;
				await dispatch({
					type     : UPDATE_CATEGORY,
					category
				});
			}
			return res;
		} catch (err) {
			console.log('updateCategory() error:', err);
		}
	};
}

export function deleteCategory(id) {
	return async function(dispatch) {
		try {
			const res = await makeDeleteRequest(`categories/${id}`);
			if (res.status === 200) {
				const { deleted } = res.data;
				await dispatch({
					type    : DELETE_CATEGORY,
					deleted
				});
			}
			return res;
		} catch (err) {
			console.log('deleteCategory() error:', err);
		}
	};
}
