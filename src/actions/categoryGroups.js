import { BackendApi } from '../api/api';

import { ADD_CATEGORY_GROUP, DELETE_CATEGORY_GROUP, UPDATE_CATEGORY_GROUP } from './types';

export function registerCategoryGroup(id, data) {
	return async function(dispatch) {
		data.restaurantId = id;
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.postCategoryGroupApi(data);
		if (res.status === 201) {
			const {catGroup} = res.data
			await dispatch({
				type     : ADD_CATEGORY_GROUP,
				catGroup
			});
		}
		return res;
	};
}

export function updateCategoryGroup(id, data) {
	return async function(dispatch) {
		if (data.notes === '') {
			delete data.notes;
		}

		const res = await BackendApi.putCategoryGroupApi(id, data);
		if (res.status === 200) {
			const { catGroup } = res.data;
			await dispatch({
				type     : UPDATE_CATEGORY_GROUP,
				catGroup
			});
		}
		return res;
	};
}

export function deleteCategoryGroup(id) {
	return async function(dispatch) {
		const res = await BackendApi.deleteCategoryGroupApi(id);
		if (res.status === 200) {
			const { deleted } = res.data;
			await dispatch({
				type    : DELETE_CATEGORY_GROUP,
				deleted
			});
		}
		return res;
	};
}
