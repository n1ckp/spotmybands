import {applyMiddleware, createStore, combineReducers, compose} from 'redux'
import thunk from 'redux-thunk'

import * as reducers from 'redux/reducers'

let middleware = applyMiddleware(thunk)

if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  middleware = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
}

export default function configureStore(initialState) {
  const store = createStore(combineReducers(reducers), initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const newReducers = require('./reducers/index')

      store.replaceReducer(combineReducers(newReducers), middleware)
    })
  }

  return store
}
