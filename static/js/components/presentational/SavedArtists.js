import React from 'react'

import styles from 'components/SavedArtists.scss'

export default class SavedArtists extends React.Component {
  render() {
    return (
      <div id={styles.container}>
        <h1>Your Artists</h1>
      </div>
    )
  }
}
