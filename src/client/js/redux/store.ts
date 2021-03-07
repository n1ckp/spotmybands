import { applyMiddleware, createStore, combineReducers } from 'redux'
const thunk = require('redux-thunk').default

import * as reducers from './reducers'

let middleware = applyMiddleware(thunk)

export default function configureStore(initialState) {
  const store = createStore(combineReducers(reducers), initialState, middleware)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const newReducers = require('./reducers/index')

      store.replaceReducer(combineReducers(newReducers) as any)
    })
  }

  return store
}
