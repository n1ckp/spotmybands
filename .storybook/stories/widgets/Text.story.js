import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, text} from '@storybook/addon-knobs'

import Text from 'components/shared/widgets/Text'

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }
  render() {
    return (
      <Text
        value={this.state.value}
        onChange={value => this.setState({value})}
        placeholder='Enter Text' />
    )
  }
}

storiesOf('Widgets/Text', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Wrapper />
  ))
