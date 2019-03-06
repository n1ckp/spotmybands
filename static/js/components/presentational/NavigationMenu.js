import React from 'react'

import SavedArtistsContainer from 'components/container/SavedArtistsContainer'
import InfoPanel from 'components/presentational/InfoPanel'

import LogoImage from 'logo.svg'
import ArtistsImage from 'icons/nav/list-items.svg'
import InfoImage from 'icons/nav/info.svg'

import styles from 'components/NavigationMenu.scss'


export default class NavigationMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      panelOpen: true,
      selected:  'artists',
    }
  }

  renderNavOptions() {
    return (
      <div className={styles.navOptions}>
        <div className={this.state.selected === 'artists' ? styles.selected : null} onClick={() => this.setState({selected: 'artists'})}>
          <ArtistsImage />
        </div>
        <div className={this.state.selected === 'info' ? styles.selected : null} onClick={() => this.setState({selected: 'info'})}>
          <InfoImage />
        </div>
      </div>
    )
  }

  renderPanel() {
    let classNames = [styles.panel]
    let selectedPanel

    if (this.state.panelOpen) {
      classNames.push(styles.open)
    }

    if (this.state.selected === 'artists') {
      selectedPanel = <SavedArtistsContainer />
    }
    else if (this.state.selected === 'info') {
      selectedPanel = <InfoPanel />
    }

    return (
      <div className={classNames.join(' ')}>
        {selectedPanel}
      </div>
    )
  }

  render() {
    return (
      <div id={styles.container}>
        <div className={styles.inner}>
          <div className={styles.gutter}>
            <LogoImage width={40} height={49} className={styles.logo} />
            {this.renderNavOptions()}
          </div>
          {this.renderPanel()}
        </div>
      </div>
    )
  }
}
