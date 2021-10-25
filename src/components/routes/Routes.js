import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Home from '../Home';
import LoginForm from '../users/LoginForm';
import ProtectedRouteUser from './ProtectedRouteUser';

import RegisterUserForm from '../users/RegisterUserForm';

import RestaurantDetail from '../restaurants/RestaurantDetail';
import AllRestaurantsScreen from '../restaurants/AllRestaurantsScreen';
import NewRestaurantForm from '../restaurants/NewRestaurantForm';

import MealPeriodDetail from '../mealPeriods/MealPeriodDetail';
import AllMealPeriodsScreen from '../mealPeriods/AllMealPeriodsScreen';
import NewMealPeriodForm from '../mealPeriods/NewMealPeriodForm';

import CategoryGroupDetail from '../categoryGroups/CategoryGroupDetail';
import AllCategoryGroupsScreen from '../categoryGroups/AllCategoryGroupsScreen';
import NewCategoryGroupForm from '../categoryGroups/NewCategoryGroupForm';

import CategoryDetail from '../categories/CategoryDetail';
import AllCategoriesScreen from '../categories/AllCategoriesScreen';
import NewCategoryForm from '../categories/NewCategoryForm';

import AllDefaultSalesScreen from '../defaultSales/AllDefaultSalesScreen';

import InvoiceDetail from '../invoices/InvoiceDetail';
import AllInvoicesScreen from '../invoices/AllInvoicesScreen';
import NewInvoiceForm from '../invoices/NewInvoiceForm';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>

			<Route exact path="/login">
				<LoginForm />
			</Route>
			<Route exact path="/register">
				<RegisterUserForm />
			</Route>

			<ProtectedRoute component={AllRestaurantsScreen} exact path="/restaurants" />
			<ProtectedRoute component={NewRestaurantForm} exact path="/restaurants/new" />
			<ProtectedRouteUser component={RestaurantDetail} exact path="/restaurants/:restaurantId" />

			<ProtectedRouteUser component={AllMealPeriodsScreen} exact path="/restaurants/:restaurantId/meal-periods" />
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

			<ProtectedRouteUser
				component={AllCategoryGroupsScreen}
				exact
				path="/restaurants/:restaurantId/category-groups"
			/>
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

			<ProtectedRouteUser component={AllCategoriesScreen} exact path="/restaurants/:restaurantId/categories" />
			<ProtectedRouteUser component={NewCategoryForm} exact path="/restaurants/:restaurantId/categories/new" />
			<ProtectedRouteUser
				component={CategoryDetail}
				exact
				path="/restaurants/:restaurantId/categories/:categoryId"
			/>

			<ProtectedRouteUser
				component={AllDefaultSalesScreen}
				exact
				path="/restaurants/:restaurantId/default-sales"
			/>

			<ProtectedRouteUser component={AllInvoicesScreen} exact path="/restaurants/:restaurantId/invoices" />
			<ProtectedRouteUser component={NewInvoiceForm} exact path="/restaurants/:restaurantId/invoices/new" />
			<ProtectedRouteUser component={InvoiceDetail} exact path="/restaurants/:restaurantId/invoices/:invoiceId" />

			<Redirect to="/" />
		</Switch>
	);
}
