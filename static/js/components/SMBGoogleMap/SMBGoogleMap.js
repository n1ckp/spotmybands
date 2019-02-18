import React from 'react'
import {withGoogleMap, GoogleMap} from 'react-google-maps'

import styles from './SMBGoogleMap.scss'

const MapWrapper = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    center={{lat: 51.5502, lng: -0.0034}}
  />
)

export default class SMBGoogleMap extends React.Component {
  render() {
    return (
      <div id={styles.container}>
        <MapWrapper
          containerElement={
            <div style={{height: '100%'}} />
          }
          mapElement={
            <div style={{height: '100%'}} />
          } />
      </div>
    )
  }
}
