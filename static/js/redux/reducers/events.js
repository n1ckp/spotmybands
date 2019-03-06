import {FETCH_ARTIST_EVENTS, RECEIVED_ARTIST_EVENTS, TOGGLE_ARTIST_EVENTS} from '../actions'

const getInitialState = () => {
  return {}
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

  return updatedState
}
