import React from 'react'
import PropTypes from 'prop-types'

import ModalPanel from 'components/presentational/ModalPanel'

import styles from 'components/AddArtistsModal.scss'

export default class AddArtistsModal extends React.Component {
  render() {
    return (
      <ModalPanel
        open={this.props.open}
        onClose={() => this.props.onCloseModal()}>
        <div id={styles.container}>
          add artists modal
        </div>
      </ModalPanel>
    )
  }
}

AddArtistsModal.propTypes = {
  open: PropTypes.bool,
  onCloseModal: PropTypes.func,
}