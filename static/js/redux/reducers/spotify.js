import {SPOTIFY_ARTIST_SEARCH__BEGIN, SPOTIFY_ARTIST_SEARCH__END} from '../actions'

const getInitialState = () => {
  return {
    artists: {
      loading: false,
      list: undefined,
    },
  }
}

const spotify = (state=getInitialState(), action) => {
  let updatedState = Object.assign({}, state)

  if (action.type === SPOTIFY_ARTIST_SEARCH__BEGIN) {
    updatedState.artists.loading = true
  }
  else if (action.type === SPOTIFY_ARTIST_SEARCH__END) {
    updatedState.artists.list = action.artists
    updatedState.artists.loading = false
  }

  return updatedState
}

export default spotify