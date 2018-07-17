import {connect} from 'react-redux'

import {spotifySearchArtists} from 'redux/actions'

import AddArtistsModal from 'components/presentational/AddArtistsModal'

const mapStateToProps = (state, ownProps) => {
  return {
    loadingSpotifyArtists: state.spotify.artists.loading,
    spotifyArtists:        state.spotify.artists.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    spotifySearchArtist: (searchText) => {
      dispatch(spotifySearchArtists(searchText))
    }    
  }
}

const AddArtistsModalContainer = connect(mapStateToProps, mapDispatchToProps)(AddArtistsModal)

export default AddArtistsModalContainer
