import * as React from 'react'
import Text from './Text'

const SearchIcon = require('@images/icons/search.svg').default

export default {
  title: 'Atoms/Text',
  component: Text,
  argTypes: { onChange: { action: 'onChange' } },
}

const Template = (args) => <Text {...args} />

export const NoText = Template.bind({})

NoText.args = {
  placeholder: 'I\'m a placeholder',
  initialValue: '',
}

export const WithIcon = (args) => <Text {...args} icon={< SearchIcon />} />

WithIcon.args = {
  placeholder: 'I\'m a placeholder',
  initialValue: '',
}
