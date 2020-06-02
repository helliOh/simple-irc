import { all } from 'redux-saga/effects'
import { tickSaga } from './tick'
import { counterSaga } from './counter'

export default function* rootSaga() {
    yield all([
      tickSaga(),
      counterSaga()
    ])
}