import {connect} from 'react-redux'

import {fetchArtistEvents, toggleArtistEvents, removeUserArtist} from 'redux/actions'

import ArtistRow from './component'

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.artist

  const eventsNotFetched = state.events[id] === undefined
  const eventsHidden = state.events[id] && !state.events[id].hidden

  return {
    eventsNotFetched,
    eventsHidden,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {name, id} = ownProps.artist

  return {
    fetchArtistEvents: () => {
      dispatch(fetchArtistEvents(name, id))
    },
    toggleEvents: value => {
      dispatch(toggleArtistEvents(id, value))
    },
    onRemoveArtist: () => {
      dispatch(removeUserArtist(id))
    },
  }
}

const ArtistRowContainer = connect(mapStateToProps, mapDispatchToProps)(ArtistRow)

export default ArtistRowContainer
