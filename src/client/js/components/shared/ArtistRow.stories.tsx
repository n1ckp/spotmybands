import * as React from 'react'
import ArtistRow from './ArtistRow'
import { Provider } from 'react-redux'
import configureStore from '@redux/store'

export default {
  title: 'Molecules/ArtistRow',
  component: ArtistRow,
  argTypes: {
    addToUserList: { action: 'addToUserList' },
    fetchArtistEvents: { action: 'fetchArtistEvents' },
    toggleEvents: { action: 'toggleEvents' },
    onRemoveArtist: { action: 'onRemoveArtist' },
  },
}

const Template = (args) => <Provider store={configureStore({})}><ArtistRow {...args} /></Provider>

export const OnUserList = Template.bind({})
OnUserList.args = {
  artist: {
    id: '0L8ExT028jH3ddEcZwqJJ5',
    name: 'Red Hot Chili Peppers',
    logoURL: 'https://i.scdn.co/image/89bc3c14aa2b4f250033ffcf5f322b2a553d9331',
    genres: ['alternative rock', 'funk metal', 'funk rock', 'permanent wave', 'rock'],
  },
  onUserList: true,
  eventsNotFetched: true,
  eventsHidden: false,
  noEvents: false,
  fetchingEvents: false,
}

export const NotOnUserList = Template.bind({})
NotOnUserList.args = {
  ...OnUserList.args,
  onUserList: false,
}
