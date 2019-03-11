import React, {useState} from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'

import styles from './styles.scss'

const MapWrapper = withGoogleMap((props) => {
  const [selectedEvent, setSelectedEvent] = useState(undefined)

  return (
    <GoogleMap
      defaultZoom={8}
      center={{lat: 51.5502, lng: -0.0034}}>
      {
        props.events.map((event, i) => {
          const {latitude, longitude} = event.venue

          return (
            <Marker key={i} position={{lat: latitude, lng: longitude}} onClick={() => setSelectedEvent(event.id)}>
              {
                selectedEvent === event.id ?
                  <InfoWindow>
                    <div className={styles.infoWindow}>
                      <h3>{event.name}</h3>
                      <p><b>{event.artist}</b></p>
                      <p>{event.date ? format(Date.parse(event.date), 'dddd Do MMMM YYYY') : null}</p>
                      <a href={event.songkickURL} target="_blank" rel="noopener noreferrer">{event.songkickURL}</a>
                    </div>
                  </InfoWindow>
                  : null
              }
            </Marker>
          )
        })}
    </GoogleMap>
  )
})

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

SMBGoogleMap.propTypes = {
  events:        PropTypes.array,
  selectedEvent: PropTypes.string,
}

export default SMBGoogleMap
