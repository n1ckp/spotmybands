import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Text from 'components/widgets/Text'
import Button from 'components/widgets/Button'

import ArtistRow from 'components/shared/ArtistRow'

import AddArtistsModal from 'components/AddArtistsModal'

import SearchIcon from 'icons/search.svg'

import styles from './styles.scss'

const SavedArtists = props => {
  const [filteredArtists, setFilteredArtists] = useState(Object.values(props.artists))

  const artistTable = (
    <div className={styles.artistsContainer}>
      {Object.values(filteredArtists).map((artist, index) => {
        return <ArtistRow key={index} artist={artist} onUserList={true} />
      })}
    </div>
  )

  const onChangeText = text => {
    const filtered = Object.values(props.artists).filter(a => a.name.toLowerCase().match(text.toLowerCase()))

    setFilteredArtists(filtered)
  }

  return (
    <div id={styles.container}>
      <h1>Your Artists</h1>
      <div className={styles.actions}>
        <Text
          placeholder='Search for Artist...'
          onChange={onChangeText}
          icon={<SearchIcon />} />
        <AddArtistsModal>
          <Button text='Add Artists' type='primary' />
        </AddArtistsModal>
      </div>
      {artistTable}
    </div>
  )
}

SavedArtists.propTypes = {
  artists: PropTypes.object,
}

export default SavedArtists
