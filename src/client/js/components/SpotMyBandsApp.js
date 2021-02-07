import React from 'react'

import NavigationMenu from 'components/NavigationMenu'
import StreetMap from './StreetMap'

import styles from './SpotMyBandsApp.scss'

const SpotMyBandsApp = () => {
  return (
    <div id={styles.container}>
      <NavigationMenu />
      <StreetMap />
    </div>
  )
}

export default SpotMyBandsApp
