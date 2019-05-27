import React from 'react'

import SongkickLogo from 'songkick.svg'

import styles from './InfoPanel.scss'

const InfoPanel = () =>{
  return (
    <div id={styles.container}>
      <p>Created by <a href='https://n1ck.dev/'>Nick Phillips</a></p>
      <img className={styles.spotify} src={require('spotify.png')} />
      <SongkickLogo className={styles.songkick} />
    </div>
  )
}

export default InfoPanel
