import React from 'react'
import {connect} from 'react-redux'
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps'

import styles from './SMBGoogleMap.scss'

const MapWrapper = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    center={{lat: 51.5502, lng: -0.0034}}>
    {props.events.map((event, i) => {
      const {latitude, longitude} = event.venue

      return <Marker key={i} position={{lat: latitude, lng: longitude}} />
    })}
  </GoogleMap>
)

const SMBGoogleMap = props => {
  return (
    <div id={styles.container}>
      <MapWrapper
        containerElement={
          <div style={{height: '100%'}} />
        }
        mapElement={
          <div style={{height: '100%'}} />
        }
        events={props.events} />
    </div>
  )
}

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
