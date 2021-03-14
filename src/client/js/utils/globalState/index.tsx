import * as React from 'react';
import * as eventsStoreModule from './events';
import * as spotifyStoreModule from './spotify';
import * as userArtistsStoreModule from './userArtists';

interface StoreModule {
  name: string;
  getInitialState: () => { [key: string]: any };
  reducer: (...args: any) => { [key: string]: any };
}

function combinedReducers(storeModules: StoreModule[]) {
  const globalInitialState = {}
  const stateModules = {}
  storeModules.forEach(storeModule => {
    globalInitialState[storeModule.name] = storeModule.getInitialState()
    stateModules[storeModule.name].reducer = storeModule.reducer
  })

  return [globalInitialState, stateModules]
}

const [INITIAL_STATE, STATE_MODULES] = combinedReducers([
  eventsStoreModule,
  spotifyStoreModule,
  userArtistsStoreModule,
])

function reducer(state = {}, { type, payload }) {
  const newState = { ...state }
  Object.keys(STATE_MODULES).forEach(moduleName => {
    if (!newState[moduleName]) {
      // Intialise state
      newState[moduleName] = STATE_MODULES[moduleName].getInitialState()
    }
    newState[moduleName] = STATE_MODULES[moduleName].reducer(newState[moduleName], { type, payload })
  })
  return newState
}

export const GlobalStateContext = React.createContext({ state: undefined, dispatch: undefined });

export function GlobalStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)
  const contextValue = React.useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);
  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  )
}
