import React from 'react'
import Text from './Text'

import SearchIcon from 'icons/search.svg'

export default {
  title:     'Atoms/Text',
  component: Text,
  argTypes:  {onChange: {action: 'onChange'}},
}

const Template = (args) => <Text {...args} />

export const NoText = Template.bind({})

NoText.args = {
  placeholder:  'I\'m a placeholder',
  initialValue: '',
}

export const WithIcon = (args) => <Text {...args} icon={<SearchIcon />} />

WithIcon.args = {
  placeholder:  'I\'m a placeholder',
  initialValue: '',
}
