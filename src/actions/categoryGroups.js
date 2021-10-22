import { makeDeleteRequest, makeGetRequest, makePostRequest, makePutRequest } from '../helpers/api';

import { ADD_CATEGORY_GROUP, DELETE_CATEGORY_GROUP, UPDATE_CATEGORY_GROUP } from './types';

export function registerCategoryGroup(id, data) {
	return async function(dispatch) {
		try {
			data.restaurantId = id;
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePostRequest(`catgroups`, data);
			if (res.status === 201) {
				const catGroup = res.data.catGroup;
				await dispatch({
					type       : ADD_CATEGORY_GROUP,
					catGroup
				});
			}
			return res;
		} catch (err) {
			console.log('registerCategoryGroup() error:', err);
		}
	};
}

export function updateCategoryGroup(id, data) {
	return async function(dispatch) {
		try {
			if (data.notes === '') {
				delete data.notes;
			}

			const res = await makePutRequest(`catgroups/${id}`, data);
			if (res.status === 200) {
				const { catGroup } = res.data;
				await dispatch({
					type       : UPDATE_CATEGORY_GROUP,
					catGroup
				});
			}
			return res;
		} catch (err) {
			console.log('updateCategoryGroup() error:', err);
		}
	};
}

export function deleteCategoryGroup(id) {
	return async function(dispatch) {
		try {
			const res = await makeDeleteRequest(`catgroups/${id}`);
			if (res.status === 200) {
				const { deleted } = res.data;
				await dispatch({
					type    : DELETE_CATEGORY_GROUP,
					deleted
				});
			}
			return res;
		} catch (err) {
			console.log('deleteCategoryGroup() error:', err);
		}
	};
}
