import * as React from 'react'
import * as classnames from 'classnames'
import { GlobalStateContext } from '@utils/globalState'
import { actionFetchArtistEvents, actionToggleArtistEvents } from '@utils/globalState/events'
import { actionRemoveUserArtist } from '@utils/globalState/userArtists'

const styles = require('./ArtistRow.scss').default

import Button from '@components/shared/widgets/Button'
const DeleteIcon = require('@images/icons/delete.svg').default
import LoadingOverlay from '@components/shared/widgets/LoadingOverlay'

type ArtistData = {
  id: string,
  name: string,
  logoURL?: string,
  genres: string[],
}

type ArtistRowProps = {
  artist: ArtistData,
  onUserList: boolean,
  addToUserList?: (artist: ArtistData) => void,
}

const ArtistRow: React.FC<ArtistRowProps> = ({
  artist, onUserList, addToUserList,
}) => {
  const artistName = artist.name
  const artistID = artist.id

  const { state, dispatch } = React.useContext(GlobalStateContext)
  const artistData = state.events[artistID]

  const fetchingEvents = artistData && artistData.loading
  const eventsFetched = artistData !== undefined
  const eventsShown = artistData && !artistData.hidden && !artistData.loading && artistData.events.length
  const noEvents = artistData && !artistData.loading && artistData.events.length === 0

  const fetchArtistEvents = () => {
    actionFetchArtistEvents(dispatch, { artistName, artistID })
  }
  const toggleEvents = (isHidden: boolean) => {
    actionToggleArtistEvents(dispatch, { artistID, isHidden })
  }
  const onRemoveArtist = () => {
    actionRemoveUserArtist(dispatch, { artistID })
  }

  let button = undefined
  let removeButton = undefined

  if (!onUserList) {
    button = <Button onClick={() => addToUserList(artist)}>Add to my list</Button>
  }
  else if (!eventsFetched) {
    button = <Button onClick={() => fetchArtistEvents()}>Fetch Events</Button>
  }
  else if (fetchingEvents) {
    button = <p>Fetching events...</p>
  }
  else if (noEvents) {
    button = <p>No upcoming events.</p>
  }
  else {
    button = <Button onClick={() => toggleEvents(eventsShown)}>
      {`${eventsShown ? 'Hide' : 'Show'} Events`}
    </Button>
  }

  if (onUserList) {
    removeButton = <Button className={styles.delete} onClick={() => onRemoveArtist()}><DeleteIcon /></Button>
  }

  const className = classnames({
    [styles.noEvents]: noEvents,
    [styles.eventsShown]: eventsShown,
  })

  return (
    <LoadingOverlay active={fetchingEvents}>
      <div id={styles.container} className={className}>
        <span className={styles.icon} style={{ backgroundImage: `url(${artist.logoURL})` }}></span>
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
    </LoadingOverlay>
  )
}

export default ArtistRow
