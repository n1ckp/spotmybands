import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, text, radios} from '@storybook/addon-knobs'

import Button from 'components/widgets/Button'

const label = 'type'
const options = {
  Default: 'default',
  Primary: 'primary',
}
const defaultValue = 'primary'

storiesOf('Widgets/Button', module)
  .addDecorator(withKnobs)
  .add('with text', () => (
    <Button type={radios(label, options, defaultValue)}><p>{text('inner', 'Click me')}</p></Button>
  ))
  .add('with emoji', () => (
    <Button type={radios(label, options, defaultValue)}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ))
