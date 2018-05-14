import React from 'react'

import styles from 'components/tables/ArtistRow.scss'


export default class ArtistRow extends React.Component {
  render() {
    const artist = this.props.artist

    return (
      <div id={styles.container}>
        <span className={styles.icon} style={{backgroundImage: `url(${artist.logoURL})`}}></span>
        <div className={styles.info}>
          <h2>{artist.name}</h2>
          <p>{artist.nextGigDate}<span>{artist.nextGigLocation}</span></p>
        </div>
        <div className={styles.actions}>
          buttons go here
        </div>
      </div>
    )
  }
}