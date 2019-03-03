import React from 'react'
import PropTypes from 'prop-types'

import styles from 'components/tables/ArtistRow.scss'

import Button from 'components/presentational/widgets/Button'


const ArtistRow = props => {
  const {artist, onUserList, addToUserList} = props

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
      {
        !onUserList &&
        <div className={styles.actions}>
          <Button text='Add to my list' onClick={() => addToUserList(artist)} />
        </div>
      }
    </div>
  )
}

ArtistRow.propTypes = {
  artist:        PropTypes.object.isRequired,
  onUserList:    PropTypes.bool,
  addToUserList: PropTypes.func,
}

export default ArtistRow
