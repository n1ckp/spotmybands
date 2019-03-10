import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'

import Button from 'components/widgets/Button'


const ArtistRow = props => {
  const {
    artist, onUserList, addToUserList, fetchArtistEvents,
    toggleEvents, eventsNotFetched, eventsHidden,
    onRemoveArtist, noEvents, fetchingEvents,
  } = props

  let button = undefined
  let removeButton = undefined

  if (!onUserList) {
    button = <Button onClick={() => addToUserList(artist)}>Add to my list</Button>
  }
  else if (eventsNotFetched) {
    button = <Button onClick={() => fetchArtistEvents()}>Fetch Events</Button>
  }
  else if (fetchingEvents) {
    button = <p>Fetching events...</p>
  }
  else if (noEvents) {
    button = <p>No upcoming events.</p>
  }
  else {
    button = <Button onClick={() => toggleEvents(eventsHidden)}>
      {`${eventsHidden ? 'Hide' : 'Show'} Events`}
    </Button>
  }

  if (onUserList) {
    removeButton = <Button onClick={() => onRemoveArtist()}>Remove</Button>
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
        {removeButton}
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
  onRemoveArtist:    PropTypes.func,
  noEvents:          PropTypes.bool,
  fetchingEvents:    PropTypes.bool,
}

export default ArtistRow
