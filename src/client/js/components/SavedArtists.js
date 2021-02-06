import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Text from 'components/shared/widgets/Text'
import Button from 'components/shared/widgets/Button'

import ArtistRow from 'components/shared/ArtistRow'

import AddArtistsModal from 'components/AddArtistsModal'

import SearchIcon from 'icons/search.svg'

import styles from './SavedArtists.scss'

const SavedArtists = props => {
  const [filterText, setFilterText] = useState('')

  const filteredArtists = Object.values(props.artists).filter(a => a.name.toLowerCase().match(filterText.toLowerCase()))
  const hasArtists = Object.values(props.artists).length > 0
  const hasVisibleArtists = filteredArtists.length > 0

  const artistTable = (
    <div className={styles.artistsContainer}>
      {
        hasVisibleArtists ?
          filteredArtists.map((artist, index) => {
            return <ArtistRow key={index} artist={artist} onUserList={true} />
          })
          :
          hasArtists ?
            <p>No artists visible using current search</p> :
            <p>No saved artists, please add using the button above.</p>}
    </div>
  )

  return (
    <div id={styles.container}>
      <h1>Your Artists</h1>
      <div className={styles.actions}>
        {hasArtists && <Text
          placeholder='Search for Artist...'
          onChange={text => setFilterText(text)}
          icon={<SearchIcon />} />}
        <AddArtistsModal>
          <Button type='primary' className={styles.button}>Add</Button>
        </AddArtistsModal>
      </div>
      {artistTable}
    </div>
  )
}

SavedArtists.propTypes = {
  artists: PropTypes.object,
}

const mapStateToProps = state => {
  return {
    artists: state.userArtists,
  }
}

const SavedArtistsContainer = connect(mapStateToProps)(SavedArtists)

export default SavedArtistsContainer
