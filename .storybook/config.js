import {configure, addParameters} from '@storybook/react'
import {create} from '@storybook/theming'

// coral / ocean highlights
const theme = create({ base: 'dark', colorPrimary: '#FF4785', colorSecondary: '#1EA7FD' });
addParameters({ options: { theme } });

function loadStories() {
  require('./stories/index.js')
  // You can require as many stories as you need.
}

configure(loadStories, module)
