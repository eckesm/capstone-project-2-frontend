import { combineReducers } from 'redux';
import auth from './auth';
import restaurants from './restaurants';

const rootReducer = combineReducers({ auth, restaurants });

export default rootReducer;
