import React from 'react'
import PropTypes from 'prop-types'

import styles from 'components/tables/ArtistRow.scss'

import Button from 'components/presentational/widgets/Button'


export default class ArtistRow extends React.Component {
  renderActions() {
    let button

    if (!this.props.onUserList) {
      button = <Button text='Add to my list' onClick={() => this.props.addToUserList(this.props.artist)} />
    }

    return (
      <div className={styles.actions}>
        {button}
      </div>
    )
  }

  renderGenres() {
    if (!this.props.artist.genres) {
      return null
    }

    const genres = this.props.artist.genres.map(genre => {
      return <span>{genre}</span>
    })

    return (
      <div className={styles.genres}>
        {genres}
      </div>
    )
  }

  render() {
    const artist = this.props.artist

    return (
      <div id={styles.container}>
        <span className={styles.icon} style={{backgroundImage: `url(${artist.logoURL})`}}></span>
        <div className={styles.info}>
          <h2>{artist.name}</h2>
          {this.renderGenres()}
        </div>
        {this.renderActions()}
      </div>
    )
  }
}

ArtistRow.propTypes = {
  artist: PropTypes.object.isRequired,
  onUserList: PropTypes.bool,
  addToUserList: PropTypes.func,
}