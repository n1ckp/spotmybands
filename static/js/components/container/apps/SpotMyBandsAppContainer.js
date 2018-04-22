import {connect} from 'react-redux'

import SpotMyBandsApp from 'components/presentational/apps/SpotMyBandsApp'

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const SpotMyBandsAppContainer = connect(mapStateToProps)(SpotMyBandsApp)

export default SpotMyBandsAppContainer
