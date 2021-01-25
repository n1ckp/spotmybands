import React from 'react'

import styles from './InfoPanel.scss'

const InfoPanel = () =>{
  return (
    <div id={styles.container}>
      <p>Created by <a href='https://n1ck.dev/'>Nick Phillips</a></p>
      <img className={styles.spotify} src={require('spotify.png')} />
      <img className={styles.songkick} src={require('songkick.png')} />
    </div>
  )
}

export default InfoPanel
