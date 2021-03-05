import React from 'react'
import StreetMap from './StreetMap'
import {Provider} from 'react-redux'
import configureStore from 'redux/store'

export default {
  title:     'Organisms/StreetMap',
  component: StreetMap,
}

const Template = (args) => <Provider store={configureStore()}><StreetMap {...args} /></Provider>

export const NoMarkers = Template.bind({})

const markers = [
  {
    id:     39682848,
    artist: 'D Double E',
    venue:  {
      name:      'O2 Academy Bristol',
      latitude:  51.4539,
      longitude: -2.60035,
    },
    date:        '2021-05-06',
    songkickURL: 'https://www.songkick.com/concerts/39682848-d-double-e-at-o2-academy-bristol?utm_source=30708&utm_medium=partner',
    name:        'D Double E at O2 Academy Bristol (May 6, 2021)',
  },
  {
    id:     39293810,
    artist: 'D Double E',
    venue:  {
      name:      'O2 Forum Kentish Town',
      latitude:  51.55214,
      longitude: -0.14217,
    },
    date:        '2021-05-07',
    songkickURL: 'https://www.songkick.com/concerts/39293810-d-double-e-at-o2-forum-kentish-town?utm_source=30708&utm_medium=partner',
    name:        'D Double E at O2 Forum Kentish Town (May 7, 2021) (POSTPONED) ',
  },
]

const initStore = {
  events: {
    ddoublee: {
      hidden: false,
      events: markers,
    },
  },
}

export const WithMarkers = (args) => <Provider store={configureStore(initStore)}><StreetMap {...args} /></Provider>

