import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Home from '../Home';
import Login from '../LoginForm';
import ProtectedRouteUser from './ProtectedRouteUser';

import RestaurantDetail from '../restaurants/RestaurantDetail';
import AllRestaurants from '../restaurants/AllRestaurants';
import NewRestaurantForm from '../restaurants/NewRestaurantForm';

import MealPeriodDetail from '../mealPeriods/MealPeriodDetail';
import AllMealPeriods from '../mealPeriods/AllMealPeriods';
import NewMealPeriodForm from '../mealPeriods/NewMealPeriodForm';

import CategoryGroupDetail from '../categoryGroups/CategoryGroupDetail';
import AllCategoryGroups from '../categoryGroups/AllCategoryGroups';
import NewCategoryGroupForm from '../categoryGroups/NewCategoryGroupForm';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>

			<Route exact path="/login">
				<Login />
			</Route>

			<ProtectedRoute component={AllRestaurants} exact path="/restaurants" />
			<ProtectedRoute component={NewRestaurantForm} exact path="/restaurants/new" />
			<ProtectedRouteUser component={RestaurantDetail} exact path="/restaurants/:restaurantId" />

			<ProtectedRouteUser component={AllMealPeriods} exact path="/restaurants/:restaurantId/meal-periods" />
			<ProtectedRouteUser
				component={NewMealPeriodForm}
				exact
				path="/restaurants/:restaurantId/meal-periods/new"
			/>
			<ProtectedRouteUser
				component={MealPeriodDetail}
				exact
				path="/restaurants/:restaurantId/meal-periods/:mealPeriodId"
			/>

			<ProtectedRouteUser component={AllCategoryGroups} exact path="/restaurants/:restaurantId/category-groups" />
			<ProtectedRouteUser
				component={NewCategoryGroupForm}
				exact
				path="/restaurants/:restaurantId/category-groups/new"
			/>
			<ProtectedRouteUser
				component={CategoryGroupDetail}
				exact
				path="/restaurants/:restaurantId/category-groups/:catGroupId"
			/>

			<Redirect to="/" />
		</Switch>
	);
}
