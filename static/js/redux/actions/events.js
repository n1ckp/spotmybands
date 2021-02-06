import {apiFetch} from 'util/settings'

export const FETCH_ARTIST_EVENTS = 'FETCH_ARTIST_EVENTS'
export const RECEIVED_ARTIST_EVENTS = 'RECEIVED_ARTIST_EVENTS'
export const TOGGLE_ARTIST_EVENTS = 'TOGGLE_ARTIST_EVENTS'

export const fetchArtistEvents = (artistName, artistID) => {
  return dispatch => {
    dispatch({type: FETCH_ARTIST_EVENTS, artistID})

    return apiFetch(`/artist-events/?artistName=${encodeURI(artistName)}`)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type:         RECEIVED_ARTIST_EVENTS,
          artistID,
          artistEvents: data.artistEvents,
        })
      })
  }
}


export const toggleArtistEvents = (artistID, value) => {
  return {
    type: TOGGLE_ARTIST_EVENTS,
    artistID,
    value,
  }
}
