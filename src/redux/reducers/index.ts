const {combineReducers} = require('redux');
import authReducer from './authReducer';

const RootReducer = combineReducers({AuthReducer: authReducer});

export default RootReducer;
