import React from 'react'
import Button from './Button'

import DeleteIcon from 'icons/delete.svg'

export default {
  title:     'Atoms/Button',
  component: Button,
  argTypes:  {onClick: {action: 'onClick'}},
}

const Template = (args) => <Button {...args}>Click me</Button>

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
}

export const WithIcon = (args) => <Button {...args}><DeleteIcon /></Button>
WithIcon.args = {
  type: '',
}
