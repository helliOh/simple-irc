import { all } from 'redux-saga/effects'
import { tickSaga } from '../reducers/tick'
import { counterSaga } from '../reducers/counter'

export default function* rootSaga() {
    yield all([
      tickSaga(),
      counterSaga()
    ])
}