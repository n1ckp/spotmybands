import {
  FETCH_ARTIST_EVENTS, RECEIVED_ARTIST_EVENTS, TOGGLE_ARTIST_EVENTS,
  REMOVE_USER_ARTIST,
} from '../actions'

import {save, load} from 'util/storage'

const getInitialState = () => {
  return load('userEvents') || {}
}

export default function events(state = getInitialState(), action) {
  let updatedState = Object.assign({}, state)

  if (action.type === FETCH_ARTIST_EVENTS) {
    updatedState[action.artistID] = {
      loading: true,
      hidden:  false,
      events:  [],
    }
  }
  else if (action.type === RECEIVED_ARTIST_EVENTS) {
    updatedState[action.artistID] = {
      loading: false,
      hidden:  false,
      events:  action.artistEvents,
    }
  }
  else if (action.type === TOGGLE_ARTIST_EVENTS) {
    updatedState[action.artistID] = {
      loading: false,
      hidden:  action.value,
      events:  updatedState[action.artistID].events,
    }
  }
  else if (action.type === REMOVE_USER_ARTIST) {
    delete updatedState[action.artistID]
  }

  save('userEvents', updatedState)

  return updatedState
}