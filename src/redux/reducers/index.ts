import { combineReducers } from 'redux';
import authReducer from './authReducer';
import payloadReducer from './payloadReducer';

const RootReducer = combineReducers({AuthReducer: authReducer, payloadReducer});

export default RootReducer;
