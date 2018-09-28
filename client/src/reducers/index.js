import { combineReducers } from 'redux';
import housesReducer from './housesReducer';

export default combineReducers({
    item: housesReducer
});