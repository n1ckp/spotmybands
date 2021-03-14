import { save, load, remove } from '@utils/storage'

export const name = 'userArtists'

const actions = {
  FETCHED_USER_ARTISTS: 'FETCHED_USER_ARTISTS',
  ADD_USER_ARTIST: 'ADD_USER_ARTIST',
  CLEAR_USER_ARTISTS: 'CLEAR_USER_ARTISTS',
  REMOVE_USER_ARTIST: 'REMOVE_USER_ARTIST',
}

export const getInitialState = () => {
  return load('userArtists') || {}
}

export const reducer = (state = getInitialState(), { type, payload }) => {
  let updatedState = Object.assign({}, state)

  if (type === actions.FETCHED_USER_ARTISTS) {
    updatedState = payload.artists
  }
  else if (type === actions.ADD_USER_ARTIST) {
    updatedState[payload.artistID] = payload.artist
  }
  else if (type === actions.REMOVE_USER_ARTIST) {
    delete updatedState[payload.artistID]
  }
  else if (type === actions.CLEAR_USER_ARTISTS) {
    updatedState = {}
  }
  save('userArtists', updatedState)

  return updatedState
}

// Action creators
export const actionFetchUserArtists = (dispatch) => {
  const artists = load('userArtists', {})

  dispatch({
    type: actions.FETCHED_USER_ARTISTS,
    payload: { artists },
  })
}

export const actionAddUserArtist = (dispatch, { artistID, artist }) => {
  dispatch({
    type: actions.ADD_USER_ARTIST,
    payload: {
      artistID,
      artist,
    },
  })
}

export const actionRemoveUserArtist = (dispatch, { artistID }) => {
  dispatch({
    type: actions.REMOVE_USER_ARTIST,
    artistID,
  })
}

export const actionClearUserArtists = (dispatch) => {
  remove('userArtists')

  dispatch({
    type: actions.CLEAR_USER_ARTISTS,
  })
}
