import { combineReducers } from 'redux';
import active from './active';
import auth from './auth';
// import budget from './budget';
import invoices from './invoices';
import restaurants from './restaurants';
import sales from './sales';

const rootReducer = combineReducers({ active, auth, invoices, restaurants, sales });
// const rootReducer = combineReducers({ active, auth, budget, invoices, restaurants, sales });

export default rootReducer;
