import { put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

//action types
const TICK = 'TICK';
const TICK_ASYNC = 'TICK_ASYNC';

export const actionTypes = {
    TICK : TICK,
    TICK_ASYNC : TICK_ASYNC
}

const tick = createAction(TICK);
const tickAsync = createAction(TICK_ASYNC);

export const actions = {
    tick : tick,
    tickAsync : tickAsync
}

export const reducer = handleActions({
    [TICK]: (state, action) => {
        console.log('TICK REDUCER');
        console.log(state, action);
        return state + 1
    }
    
}, 0);

//saga
function* tickAsyncSaga() {
    yield delay(1000);
    yield put(tick());
}

//saga helper
export function* tickSaga() {
    yield takeEvery(TICK_ASYNC, tickAsyncSaga);
}
