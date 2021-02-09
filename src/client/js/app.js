import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from 'redux/store'

import SpotMyBandsApp from 'components/SpotMyBandsApp'

const renderApp = () => {
  render((
    <Provider store={configureStore()}>
      <SpotMyBandsApp />
    </Provider>
  ), document.getElementById('app-root'))
}

renderApp()

if (module.hot) module.hot.accept(() => renderApp())
