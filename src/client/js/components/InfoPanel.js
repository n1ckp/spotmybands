import React from 'react'

import styles from './InfoPanel.scss'

const InfoPanel = () =>{
  return (
    <div id={styles.container}>
      <p>Created by <a href='https://n1ck.dev/'>Nick Phillips</a></p>
      <img className={styles.spotify} src={require('spotify.png').default} />
      <img className={styles.songkick} src={require('songkick.png').default} />
      <a href="/storybook">Link to Storybook for this App</a>
    </div>
  )
}

export default InfoPanel
