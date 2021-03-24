import * as React from 'react'
import Button, { BUTTON_TYPES, DEFAULT_BUTTON_TYPE } from './Button'

const DeleteIcon = require('@images/icons/delete.svg').default

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'onClick' },
    type: {
      control: {
        type: 'select',
        options: BUTTON_TYPES,
      }
    }
  },
}

const Template = ({ text, ...args }) => <Button {...args}>{text}</Button>

export const Default = Template.bind({})
Default.args = {
  type: DEFAULT_BUTTON_TYPE,
  text: "Click Me"
}

export const WithIcon = (args) => <Button {...args}><DeleteIcon /></Button>
WithIcon.args = {
  type: '',
}
