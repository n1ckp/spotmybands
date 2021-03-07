import * as React from 'react'

const styles = require('./InfoPanel.scss').default

const InfoPanel = () => {
  return (
    <div id={styles.container}>
      <h1>About</h1>
      <p>This site is maintained as a side project by <a href='https://n1ck.dev/'>Nick Phillips</a>.</p>
      <p>Uses APIs from these sources:</p>
      <div>
        <img className={styles.spotify} src={require('@images/spotify.png').default} />
        <img className={styles.songkick} src={require('@images/songkick.png').default} />
      </div>
      <hr />
      <a href="/storybook">Storybook component library</a>
    </div>
  )
}

export default InfoPanel
