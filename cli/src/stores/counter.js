import { put, takeEvery } from 'redux-saga/effects';
import { createAction, handleActions } from 'redux-actions';

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

//action types
const ADD = 'ADD';
const ADD_ASYNC = 'ADD_ASYNC';

export const actionTypes = {
    ADD : ADD,
    ADD_ASYNC : ADD_ASYNC
}

//actions
const add = createAction(ADD);
const addAsync = createAction(ADD_ASYNC);

export const actions = {
    add : add,
    addAsync : addAsync
}

//reducer
export const reducer = handleActions({
    [ADD]: (state, action) => ({
        count : state.count + 1
    }),
}, {count : 0});

//saga
function* addAsyncSaga() {
    yield delay(1000);
    yield put(add());
}

//saga helper
export function* counterSaga() {
    yield takeEvery(ADD_ASYNC, addAsyncSaga);
}





