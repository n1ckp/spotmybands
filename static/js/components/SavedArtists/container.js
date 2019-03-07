import {connect} from 'react-redux'

import SavedArtists from './component'

const mapStateToProps = (state, ownProps) => {
  return {
    artists: state.userArtists.artists,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const SavedArtistsContainer = connect(mapStateToProps, mapDispatchToProps)(SavedArtists)

export default SavedArtistsContainer
