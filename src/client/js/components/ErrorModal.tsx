import * as React from 'react'
import { GlobalStateContext } from '@utils/globalState';
import { actionClearError } from '@utils/globalState/error';
import ModalPanel from './ModalPanel';

const styles = require("./ErrorModal.scss").default;

const ErrorModal = (): React.ReactElement => {
  const { state, dispatch } = React.useContext(GlobalStateContext);
  const { message } = state.error

  React.useEffect(() => {

  }, [message])

  const handleCloseModal = () => {
    actionClearError(dispatch)
  }

  return (
    <ModalPanel open={!!message} onClose={handleCloseModal}>
      <div id={styles.container}>
        <div className={styles.inner}>
          <h3>This site has encountered an error :(</h3>
          <p>Error: <b>{message}</b></p>
        </div>
      </div>
    </ModalPanel>
  )
}

export default ErrorModal
