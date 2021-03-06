import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import HomeScreen from '../home/HomeScreen';
import LoginScreen from '../users/LoginScreen';
import ProtectedRouteUser from './ProtectedRouteUser';
import ProtectedRouteAdmin from './ProtectedRouteAdmin';

import RegisterUserScreen from '../users/RegisterUserScreen';

import RestaurantDetailScreen from '../restaurants/RestaurantDetailScreen';
import AllRestaurantsScreen from '../restaurants/AllRestaurantsScreen';
import NewRestaurantScreen from '../restaurants/NewRestaurantScreen';
import EditRestaurantScreen from '../restaurants/EditRestaurantScreen';
import RestaurantUsersScreen from '../restaurants/RestaurantUsersScreen';
import AddUserToRestaurantScreen from '../restaurants/AddUserToRestaurantScreen';

import MealPeriodDetailScreen from '../mealPeriods/MealPeriodDetailScreen';
import AllMealPeriodsScreen from '../mealPeriods/AllMealPeriodsScreen';
import NewMealPeriodScreen from '../mealPeriods/NewMealPeriodScreen';

import CategoryGroupDetailScreen from '../categoryGroups/CategoryGroupDetailScreen';
import AllCategoryGroupsScreen from '../categoryGroups/AllCategoryGroupsScreen';
import NewCategoryGroupScreen from '../categoryGroups/NewCategoryGroupScreen';

import CategoryDetailScreen from '../categories/CategoryDetailScreen';
import AllCategoriesScreen from '../categories/AllCategoriesScreen';
import NewCategoryScreen from '../categories/NewCategoryScreen';

import AllDefaultSalesScreen from '../defaultSales/AllDefaultSalesScreen';

import AllMealPeriodCatsScreen from '../mealPeriodCats/AllMealPeriodCatsScreen';

import AllSalesScreen from '../sales/AllSalesScreen';

import InvoiceDetailScreen from '../invoices/InvoiceDetailScreen';
import AllInvoicesScreen from '../invoices/AllInvoicesScreen';
import NewInvoiceScreen from '../invoices/NewInvoiceScreen';

import BudgetScreen from '../budget/BudgetScreen';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<HomeScreen />
			</Route>

			<Route exact path="/login">
				<LoginScreen />
			</Route>
			<Route exact path="/register">
				<RegisterUserScreen />
			</Route>

			<ProtectedRoute component={AllRestaurantsScreen} exact path="/restaurants" />
			<ProtectedRoute component={NewRestaurantScreen} exact path="/restaurants/new" />
			<ProtectedRouteUser component={RestaurantDetailScreen} exact path="/restaurants/:restaurantId" />
			<ProtectedRouteAdmin component={EditRestaurantScreen} exact path="/restaurants/:restaurantId/edit" />
			<ProtectedRouteUser component={RestaurantUsersScreen} exact path="/restaurants/:restaurantId/users" />
			<ProtectedRouteAdmin
				component={AddUserToRestaurantScreen}
				exact
				path="/restaurants/:restaurantId/users/add"
			/>

			<ProtectedRouteUser component={AllMealPeriodsScreen} exact path="/restaurants/:restaurantId/meal-periods" />
			<ProtectedRouteUser
				component={NewMealPeriodScreen}
				exact
				path="/restaurants/:restaurantId/meal-periods/new"
			/>
			<ProtectedRouteUser
				component={MealPeriodDetailScreen}
				exact
				path="/restaurants/:restaurantId/meal-periods/:mealPeriodId"
			/>

			<ProtectedRouteUser
				component={AllCategoryGroupsScreen}
				exact
				path="/restaurants/:restaurantId/category-groups"
			/>
			<ProtectedRouteUser
				component={NewCategoryGroupScreen}
				exact
				path="/restaurants/:restaurantId/category-groups/new"
			/>
			<ProtectedRouteUser
				component={CategoryGroupDetailScreen}
				exact
				path="/restaurants/:restaurantId/category-groups/:catGroupId"
			/>

			<ProtectedRouteUser component={AllCategoriesScreen} exact path="/restaurants/:restaurantId/categories" />
			<ProtectedRouteUser component={NewCategoryScreen} exact path="/restaurants/:restaurantId/categories/new" />
			<ProtectedRouteUser
				component={CategoryDetailScreen}
				exact
				path="/restaurants/:restaurantId/categories/:categoryId"
			/>

			<ProtectedRouteUser
				component={AllDefaultSalesScreen}
				exact
				path="/restaurants/:restaurantId/default-sales"
			/>

			<ProtectedRouteUser
				component={AllMealPeriodCatsScreen}
				exact
				path="/restaurants/:restaurantId/sales-percentages"
			/>

			<ProtectedRouteUser component={AllSalesScreen} exact path="/restaurants/:restaurantId/sales" />
			<ProtectedRouteUser component={AllSalesScreen} exact path="/restaurants/:restaurantId/sales/date/:date" />

			<ProtectedRouteUser component={AllInvoicesScreen} exact path="/restaurants/:restaurantId/invoices" />
			<ProtectedRouteUser component={NewInvoiceScreen} exact path="/restaurants/:restaurantId/invoices/new" />
			<ProtectedRouteUser
				component={InvoiceDetailScreen}
				exact
				path="/restaurants/:restaurantId/invoices/:invoiceId"
			/>

			<ProtectedRouteUser component={BudgetScreen} exact path="/restaurants/:restaurantId/budget" />
			<ProtectedRouteUser component={BudgetScreen} exact path="/restaurants/:restaurantId/budget/date/:date" />

			<Redirect to="/" />
		</Switch>
	);
}
