import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { HYDRATE, createWrapper } from 'next-redux-wrapper'

import rootSaga from './saga'
import { reducer as counterReducer } from './counter';
import { reducer as tickReducer } from './tick';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const combinedReducer = (state, action) => combineReducers({
  counterReducer,
  tickReducer,
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }

    if (state.count) nextState.count = state.count // preserve count value on client side navigation
    if (state.tick) nextState.tick = state.tick

    return nextState
  } 

  return combinedReducer(state, action)
}

const makeStore = () =>{
  const sagaMiddleware = createSagaMiddleware();
  const instance = createStore(counterReducer, bindMiddleware([sagaMiddleware]));
  
  sagaMiddleware.run(rootSaga);

  return instance
}

export const wrapper = createWrapper(makeStore, {debug : true});