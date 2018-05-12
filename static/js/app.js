import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Route} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import configureStore from 'redux/store'

import SpotMyBandsAppContainer from 'components/container/apps/SpotMyBandsAppContainer'

const renderApp = () => {
  render((
    <Provider store={configureStore()}>
      <BrowserRouter>
        <Route path="/" component={SpotMyBandsAppContainer} />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('app-root'))
}

renderApp()

if (module.hot) module.hot.accept(() => renderApp())
