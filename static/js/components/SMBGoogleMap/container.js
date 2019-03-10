import {connect} from 'react-redux'

import SMBGoogleMap from './component'

const mapStateToProps = state => {
  const events = []

  Object.values(state.events).forEach(artistEvents => {
    if (!artistEvents.hidden) {
      events.push(...artistEvents.events)
    }
  })

  return {
    events,
  }
}

const SMBGoogleMapContainer = connect(mapStateToProps)(SMBGoogleMap)

export default SMBGoogleMapContainer
