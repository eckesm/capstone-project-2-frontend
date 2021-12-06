# Restaurant Budgeting Application (_frontend_)

## Stack
This project was created with [Create React App](https://github.com/facebook/create-react-app).

The frontend is built on a React framework and makes extensive use of the Redux library.

The backend is built in a Node.js ecosystem with Express.js employed as the routing framework.

## Deployment & Repositories

Heroku deployments:
* Frontend: [mre-capstone2-frontend.herokuapp.com](https://mre-capstone2-frontend.herokuapp.com)
* Backend: [mre-capstone2-backend.herokuapp.com](https://mre-capstone2-backend.herokuapp.com)

Git repositories:
* Frontend: [github.com/eckesm/capstone-project-2-frontend](https://github.com/eckesm/capstone-project-2-frontend)
* Backend: [github.com/eckesm/capstone-project-2-backend](https://github.com/eckesm/capstone-project-2-backend)

## Local Installation & Starting the Local Server

* Clone project from repository
* Navigate to teh project folder
* node is required to run the project; if necessary, run `npm install node`
* run `npm install` to install project dependancies
* create a .env file; create a variable `REACT_APP_API_URL` for the backend server address
* run `npm start` to start the server



## Functionality

The website enables users to track variable cost budgets for one or many restaurants.

To set up a restaurant, users add initial restaurant data including:
* Meal Periods
* Sales & Expense Categories
* Default Sales (by meal period and day of week)
* Sales Percentages (as percent of total meal revenue)

This data can be altered at any time as budget percentages change, sales expectations change, or there are other adjustments made to restaurant service.  These settings create default sales expectations and budgets.

Throughout the week, users can:
* Update expected sales for future days--for example: if rain is expected on Friday night, expected dinner sales can be reduced--from default settings (on the Daily Sales screen).
* Enter sales as service periods are completed to replace expected sales with real-time actual revenue figures (on the Daily Sales screen)
* Enter invoices to track real-time spending (on the Invoices screen)

Users should reference the Budget screen frequently to see how well they are sticking to their spending budgets as they are make purchasing decisions thoughout the week.

## Calculations

**TOTAL BUDGET** is determined by the following formula (by cost sale/cost category):

TOTAL BUDGET = (actual sales to date + remaining sales for the rest of the week) * cost of goods sold percentage

Example: _TOTAL FOOD BUDGET = ($10,000 [M-W actual food sales] + $15,000 [Th-Su expected food sales]) * 30% [food COGS %] = $7,500_


**REMAINING BUDGET** is determined by the following formula (by cost sale/cost category):

REMAINING BUDGET = TOTAL BUDGET - sum of invoice expenses in the week

Example: _REMAINING FOOD BUDGET = $7,500 - $4,500 [invoiced food expenses for week] = $3,000_

In this example, the restaurant would still be able to order an additional $3,000 worth of food for the week, assuming their sales expectations are accurate.  By entering actual sales results and invoices, the budget will adjust to help them stay within their spending goals.

Additional notes on calculations:
* All budgets run from Monday to Sunday
* On a given day, today's sales are based on expected daily sales until actuals are entered (as opposed to $0 until actual sales are entered)

## Additional features

Restaurant owners (the user who creates the restaurant), can add other users to a restaurant with either user or administrative priveleges.  Administrators have the same access privileges as the owner, but cannot delete the restaurant or remove the owner's access.  Users with user privileges can enter expected sales, actual sales, and invoices, but are prevented from changing settings, default values, and COGS percentages.

## Backend API

The frontend sends requests to a custom backend API located at [https://mre-capstone2-backend.herokuapp.com](https://mre-capstone2-backend.herokuapp.com/)

This API is connected to a Postgres database and is responsible for handling all CRUD features of the website.  When a new restaurant is created, the backend API automatically creates many records with default settings for the new restaurant.

API requests are sent to the following route paths:
* auth
* categories
* catGroups
* defaultSales
* expenses
* invoices
* mealPeriods
* restaurants
* sales
* user

## Available Scripts & Testing

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
