import { apiFetch } from '@utils/settings'

export const actions = {
  SPOTIFY_ARTIST_SEARCH__BEGIN: 'SPOTIFY_ARTIST_SEARCH__BEGIN',
  SPOTIFY_ARTIST_SEARCH__END: 'SPOTIFY_ARTIST_SEARCH__END',
  CLEAR_SPOTIFY_ARTISTS: 'CLEAR_SPOTIFY_ARTISTS',
}

export const name = 'spotify'

export const getInitialState = () => ({
  artists: {
    loading: false,
    list: undefined,
  },
})

export function reducer(state = getInitialState(), { type, payload }) {
  let updatedState = Object.assign({}, state)

  if (type === actions.SPOTIFY_ARTIST_SEARCH__BEGIN) {
    updatedState.artists.loading = true
  }
  else if (type === actions.SPOTIFY_ARTIST_SEARCH__END) {
    updatedState.artists.list = payload.artists
    updatedState.artists.loading = false
  }
  else if (type === actions.CLEAR_SPOTIFY_ARTISTS) {
    updatedState.artists.list = []
    updatedState.artists.loading = false
  }

  return updatedState
}


// Action creators
export const actionSpotifySearchArtists = (dispatch, { searchText }) => {
  dispatch({ type: actions.SPOTIFY_ARTIST_SEARCH__BEGIN })

  apiFetch('/artist-search/', { q: searchText })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: actions.SPOTIFY_ARTIST_SEARCH__END,
        payload: {
          artists: data.artists,
        },
      })
    })
}

export const actionClearSpotifyArtists = (dispatch) => {
  dispatch({ type: actions.CLEAR_SPOTIFY_ARTISTS })
}
