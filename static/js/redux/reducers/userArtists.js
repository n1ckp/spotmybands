import {save, load} from 'util/storage'

import {FETCHED_USER_ARTISTS, ADD_USER_ARTIST, REMOVE_USER_ARTIST, CLEAR_USER_ARTISTS} from '../actions'

const DEFAULT_ARTISTS = {
  '1234': {
    'logoURL':         'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/RHCP_Logo.svg/2000px-RHCP_Logo.svg.png',
    'name':            'The Red Hot Chili Peppers',
    'nextGigDate':     '2018-08-01',
    'nextGigLocation': 'London',
  },
  '1243': {
    'logoURL':         'https://seeklogo.com/images/F/Foo_Fighters-logo-A7966CB57F-seeklogo.com.png',
    'name':            'Foo Fighters',
    'nextGigDate':     '2018-07-20',
    'nextGigLocation': 'Manchester',
  },
  '1324': {
    'logoURL':         'http://www.clashmusic.com/sites/default/files/field/image/rsz_14.jpg',
    'name':            'D Double E',
    'nextGigDate':     '2018-06-26',
    'nextGigLocation': 'Forest Gate, London',
  },
}

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
