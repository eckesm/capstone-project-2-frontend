import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Home from '../Home';
import Login from '../LoginForm';
import NewRestaurantForm from '../restaurants/NewRestaurantForm';
import RestaurantDetail from '../restaurants/RestaurantDetail';
import AllRestaurants from '../restaurants/AllRestaurants';
import MealPeriodDetail from '../mealPeriods/MealPeriodDetail';
import ProtectedRouteUser from './ProtectedRouteUser';
import NewMealPeriodForm from '../mealPeriods/NewMealPeriodForm';
import AllMealPeriods from '../mealPeriods/AllMealPeriods';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>

			<Route exact path="/login">
				<Login />
			</Route>

			<ProtectedRoute component={NewRestaurantForm} exact path="/new" />

			<ProtectedRoute component={AllRestaurants} exact path="/restaurants" />

			<ProtectedRouteUser component={RestaurantDetail} exact path="/restaurants/:restaurantId" />
			
			<ProtectedRouteUser
				component={AllMealPeriods}
				exact
				path="/restaurants/:restaurantId/meal-periods"
			/>

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

			<Redirect to="/" />
		</Switch>
	);
}
