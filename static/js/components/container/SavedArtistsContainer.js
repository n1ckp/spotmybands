import {connect} from 'react-redux'

import SavedArtists from 'components/presentational/SavedArtists'

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const SavedArtistsContainer = connect(mapStateToProps, mapDispatchToProps)(SavedArtists)

export default SavedArtistsContainer
