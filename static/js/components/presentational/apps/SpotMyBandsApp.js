import React from 'react'

import NavigationMenu from 'components/presentational/NavigationMenu'

import styles from 'components/apps/SpotMyBandsApp.scss'

export default class SpotMyBandsApp extends React.Component {
  render() {
    return (
      <div id={styles.container}>
        <NavigationMenu />
      </div>
    )
  }
}
