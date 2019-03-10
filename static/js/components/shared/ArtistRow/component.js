import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {fetchArtistEvents, toggleArtistEvents} from 'redux/actions'

import styles from './styles.scss'

import Button from 'components/widgets/Button'


const ArtistRow = props => {
  const {
    artist, onUserList, addToUserList, fetchArtistEvents,
    toggleEvents, eventsNotFetched, eventsHidden,
  } = props

  let button = undefined

  if (!onUserList) {
    button = <Button onClick={() => addToUserList(artist)}>Add to my list</Button>
  }
  else if (eventsNotFetched) {
    button = <Button onClick={() => fetchArtistEvents()}>Fetch Events</Button>
  }
  else {
    button = <Button onClick={() => toggleEvents(eventsHidden)}>
      {`${eventsHidden ? 'Hide' : 'Show'} Events`}
    </Button>
  }

  return (
    <div id={styles.container}>
      <span className={styles.icon} style={{backgroundImage: `url(${artist.logoURL})`}}></span>
      <div className={styles.info}>
        <h2>{artist.name}</h2>
        {
          !onUserList &&
          artist.genres &&
          <div className={styles.genres}>
            {artist.genres.map((genre, i) => {
              return <span key={i}>{genre}</span>
            })}
          </div>
        }
      </div>
      <div className={styles.actions}>
        {button}
      </div>
    </div>
  )
}

ArtistRow.propTypes = {
  artist:            PropTypes.object.isRequired,
  onUserList:        PropTypes.bool,
  addToUserList:     PropTypes.func,
  fetchArtistEvents: PropTypes.func,
  eventsNotFetched:  PropTypes.bool,
  eventsHidden:      PropTypes.bool,
  toggleEvents:      PropTypes.func,
}

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
  return {
    fetchArtistEvents: () => {
      const {name, id} = ownProps.artist

      dispatch(fetchArtistEvents(name, id))
    },
    toggleEvents: value => {
      const {id} = ownProps.artist

      dispatch(toggleArtistEvents(id, value))
    },
  }
}

const ArtistRowContainer = connect(mapStateToProps, mapDispatchToProps)(ArtistRow)

export default ArtistRowContainer