import React, {useState} from 'react'

import SavedArtists from 'components/SavedArtists'
import InfoPanel from 'components/InfoPanel'

import LogoImage from 'logo.svg'
import ArtistsImage from 'icons/nav/list-items.svg'
import InfoImage from 'icons/nav/info.svg'

import styles from './styles.scss'


const NavigationMenu = props => {
  const [panelOpen, setPanelOpen] = useState(true)
  const [selected, setSelected] = useState('artists')

  let classNames = [styles.panel]
  let selectedPanel

  if (panelOpen) {
    classNames.push(styles.open)
  }

  if (selected === 'artists') {
    selectedPanel = <SavedArtists />
  }
  else if (selected === 'info') {
    selectedPanel = <InfoPanel />
  }

  return (
    <div id={styles.container}>
      <div className={styles.inner}>
        <div className={styles.gutter}>
          <LogoImage width={40} height={49} className={styles.logo} />
          <div className={styles.navOptions}>
            <div className={selected === 'artists' ? styles.selected : null} onClick={() => setSelected('artists')}>
              <ArtistsImage />
            </div>
            <div className={selected === 'info' ? styles.selected : null} onClick={() => setSelected('info')}>
              <InfoImage />
            </div>
          </div>
        </div>
        <div className={classNames.join(' ')}>
          {selectedPanel}
        </div>
      </div>
    </div>
  )
}

export default NavigationMenu
