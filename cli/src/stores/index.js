import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { HYDRATE, createWrapper } from 'next-redux-wrapper'

import rootSaga from './saga'
import rootReducer from '../reducers'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    
    // console.log('HYDRATE')
    // console.log(state);
    // console.log(action);

    if (state.count) nextState.counter = state.counter // preserve count value on client side navigation
    if (state.tick) nextState.tick = state.tick

    return nextState
  } 

  return rootReducer(state, action)
}

const makeStore = () =>{
  const sagaMiddleware = createSagaMiddleware();
  const instance = createStore(reducer, bindMiddleware([sagaMiddleware]));
  
  sagaMiddleware.run(rootSaga);

  return instance
}

export const wrapper = createWrapper(makeStore, {debug : true});