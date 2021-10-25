import { combineReducers } from 'redux';
import active from './active';
import auth from './auth';
import invoices from './invoices';
import restaurants from './restaurants';

const rootReducer = combineReducers({ active,auth, invoices, restaurants });

export default rootReducer;
