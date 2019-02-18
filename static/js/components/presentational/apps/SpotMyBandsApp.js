import React from 'react'

import NavigationMenu from 'components/presentational/NavigationMenu'
import SMBGoogleMap from 'components/SMBGoogleMap'

import styles from 'components/apps/SpotMyBandsApp.scss'

export default class SpotMyBandsApp extends React.Component {
  render() {
    return (
      <div id={styles.container}>
        <NavigationMenu />
        <SMBGoogleMap />
      </div>
    )
  }
}
