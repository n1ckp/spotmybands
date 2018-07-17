import {apiFetch} from 'util/settings'

export const SPOTIFY_ARTIST_SEARCH__BEGIN = 'SPOTIFY_ARTIST_SEARCH__BEGIN'
export const SPOTIFY_ARTIST_SEARCH__END = 'SPOTIFY_ARTIST_SEARCH__END'

export const spotifySearchArtists = (searchText) => {
  return dispatch => {
    dispatch({type: SPOTIFY_ARTIST_SEARCH__BEGIN})
    return apiFetch('/artist-search/', {q: searchText})
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: SPOTIFY_ARTIST_SEARCH__END,
          artists: data.artists,
        })
      })
  }
}