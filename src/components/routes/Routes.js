import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Home from '../Home';
import Login from '../LoginForm';
import NewRestaurantForm from '../restaurants/NewRestaurantForm';
import RestaurantDetail from '../restaurants/RestaurantDetail';
import AllRestaurants from '../restaurants/AllRestaurants';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>

			<Route exact path="/login">
				<Login />
			</Route>

			<ProtectedRoute component={NewRestaurantForm} exact path="/add-restaurant" />

			<ProtectedRoute component={AllRestaurants} exact path="/restaurants" />

			<ProtectedRoute component={RestaurantDetail} exact path="/restaurants/:id" />

			<Redirect to="/" />
		</Switch>
	);
}
