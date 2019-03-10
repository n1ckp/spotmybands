import {connect} from 'react-redux'

import {spotifySearchArtists, addUserArtist} from 'redux/actions'

import AddArtistsModal from './component'

const mapStateToProps = state => {
  return {
    loadingSpotifyArtists: state.spotify.artists.loading,
    spotifyArtists:        state.spotify.artists.list,
    userArtists:           state.userArtists,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    spotifySearchArtist: searchText => {
      dispatch(spotifySearchArtists(searchText))
    },
    addToUserList: artist => {
      dispatch(addUserArtist(artist.id, artist))
    },
  }
}

const AddArtistsModalContainer = connect(mapStateToProps, mapDispatchToProps)(AddArtistsModal)

export default AddArtistsModalContainer
