import {connect} from 'react-redux'

import {fetchArtistEvents, toggleArtistEvents, removeUserArtist} from 'redux/actions'

import ArtistRow from './component'

const mapStateToProps = (state, ownProps) => {
  const {id} = ownProps.artist
  const artistData = state.events[id]

  const fetchingEvents = artistData && artistData.loading
  const eventsNotFetched = artistData === undefined
  const eventsHidden = artistData && !artistData.hidden
  const noEvents = artistData && !artistData.loading && artistData.events.length === 0

  return {
    eventsNotFetched,
    eventsHidden,
    noEvents,
    fetchingEvents,
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
