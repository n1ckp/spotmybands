import {load, remove} from 'util/storage'

export const FETCHED_USER_ARTISTS = 'FETCHED_USER_ARTISTS'
export const ADD_USER_ARTIST = 'ADD_USER_ARTIST'
export const CLEAR_USER_ARTISTS = 'CLEAR_USER_ARTISTS'
export const REMOVE_USER_ARTIST = 'REMOVE_USER_ARTIST'

export const fetchUserArtists = () => {
  const artists = load('userArtists', {})
  return {
    type: FETCHED_USER_ARTISTS,
    artists,
  }
}

export const addUserArtist = (artistID, artist) => {
  return {
    type: ADD_USER_ARTIST,
    artistID,
    artist,
  }
}

export const removeUserArtist = artistID => {
  return {
    type: REMOVE_USER_ARTIST,
    artistID,
  }
}

export const clearUserArtists = () => {
  remove('userArtists')
  return {
    type: CLEAR_USER_ARTISTS,
  }
}