import * as React from 'react'
import { render } from 'react-dom'
import { GlobalStateProvider } from '@utils/globalState'

import SpotMyBandsApp from './components/SpotMyBandsApp'

const renderApp = () => {
  render((
    <GlobalStateProvider>
      <SpotMyBandsApp />
    </GlobalStateProvider>
  ), document.getElementById('app-root'))
}

renderApp()

if (module.hot) module.hot.accept(() => renderApp())
