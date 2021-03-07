import * as React from 'react'

const styles = require('./InfoPanel.scss').default

const InfoPanel = () => {
  return (
    <div id={styles.container}>
      <p>Created by <a href='https://n1ck.dev/'>Nick Phillips</a></p>
      <img className={styles.spotify} src={require('@images/spotify.png').default} />
      <img className={styles.songkick} src={require('@images/songkick.png').default} />
      <a href="/storybook">Link to Storybook for this App</a>
    </div>
  )
}

export default InfoPanel
