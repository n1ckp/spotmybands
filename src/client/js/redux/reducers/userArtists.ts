import {FETCHED_USER_ARTISTS, ADD_USER_ARTIST, REMOVE_USER_ARTIST, CLEAR_USER_ARTISTS} from '../actions'

import {save, load} from '@utils/storage'

const getInitialState = () => {
  return load('userArtists') || {}
}

export default function userArtists(state = getInitialState(), action) {
  let updatedState = Object.assign({}, state)

  if (action.type === FETCHED_USER_ARTISTS) {
    updatedState = action.artists
  }
  else if (action.type === ADD_USER_ARTIST) {
    updatedState[action.artistID] = action.artist
  }
  else if (action.type === REMOVE_USER_ARTIST) {
    delete updatedState[action.artistID]
  }
  else if (action.type === CLEAR_USER_ARTISTS) {
    updatedState = {}
  }
  save('userArtists', updatedState)

  return updatedState
}
