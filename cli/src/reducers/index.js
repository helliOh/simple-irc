import { combineReducers } from 'redux';
import { reducer as counter } from './counter';
import { reducer as tick } from './tick';

const rootReducer = combineReducers({
    counter,
    tick
});

export default rootReducer;