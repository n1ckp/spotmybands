import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Text from 'components/presentational/widgets/Text'
import Button from 'components/presentational/widgets/Button'

import ArtistRow from 'components/presentational/tables/ArtistRow'

import AddArtistsModalContainer from 'components/container/AddArtistsModalContainer'

import SearchIcon from 'icons/search.svg'

import styles from 'components/SavedArtists.scss'

// React Hooks version. Doesn't work nicely with Redux... :/
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
        <AddArtistsModalContainer>
          <Button text='Add Artists' type='primary' />
        </AddArtistsModalContainer>
      </div>
      {artistTable}
    </div>
  )
}

SavedArtists.propTypes = {
  artists: PropTypes.object,
}

export default SavedArtists
