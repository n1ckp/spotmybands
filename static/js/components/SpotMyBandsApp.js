import React from 'react'

import NavigationMenu from 'components/NavigationMenu'
import SMBGoogleMap from 'components/SMBGoogleMap'

import styles from './SpotMyBandsApp.scss'

const SpotMyBandsApp = () => {
  return (
    <div id={styles.container}>
      <NavigationMenu />
      <SMBGoogleMap />
    </div>
  )
}

export default SpotMyBandsApp
