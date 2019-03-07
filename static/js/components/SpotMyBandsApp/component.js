import React from 'react'

import NavigationMenu from 'components/NavigationMenu'
import SMBGoogleMap from 'components/SMBGoogleMap'

import styles from './styles.scss'

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
