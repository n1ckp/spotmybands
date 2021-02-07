import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import format from 'date-fns/format'
import Map from 'pigeon-maps'

import CloseIcon from 'icons/close.svg'
import MarkerIcon from 'icons/map-marker.svg'

import styles from './StreetMap.scss'

const Marker = ({anchor, payload, top, left, open, children, onClick, onCloseInfoBox}) => (
  <div className={styles.marker} style={{position: 'absolute', top: top - 12, left: left - 12}} onClick={onClick}>
    <MarkerIcon className={styles.icon} />
    {open && (
      <div className={styles.infoBox}>
        <button className={styles.close} onClick={onCloseInfoBox}><CloseIcon /></button>
        {children}
      </div>
    )}
  </div>
)

Marker.propTypes = {
  top:            PropTypes.number,
  left:           PropTypes.number,
  open:           PropTypes.bool,
  children:       PropTypes.node,
  onClick:        PropTypes.func,
  onCloseInfoBox: PropTypes.func,
}

const StreetMap = ({markers}) => {
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(undefined)

  return (
    <div className={styles.container}>
      <Map center={[51.5502, -0.0034]} zoom={8}>
        {markers && markers.map((marker, i) => {
          const {latitude, longitude} = marker.venue

          return (
            <Marker
              key={i}
              anchor={[latitude, longitude]}
              payload={1}
              onClick={() => setSelectedMarkerIndex(selectedMarkerIndex === i ? undefined : i)}
              open={selectedMarkerIndex === i}
              onCloseInfoBox={() => setSelectedMarkerIndex(undefined)}>
              <h3>{marker.name}</h3>
              <p><b>{marker.artist}</b></p>
              <p>{marker.date ? format(Date.parse(marker.date), 'dddd Do MMMM YYYY') : null}</p>
              <a href={marker.songkickURL} target="_blank" rel="noopener noreferrer">{marker.songkickURL}</a>
            </Marker>
          )
        })}
      </Map>
    </div>
  )
}

StreetMap.propTypes = {
  markers: PropTypes.array,
}

const mapStateToProps = state => {
  const markers = []

  Object.values(state.events).forEach(artistEvents => {
    if (!artistEvents.hidden) {
      markers.push(...artistEvents.events)
    }
  })

  return {
    markers,
  }
}

const StreetMapContainer = connect(mapStateToProps)(StreetMap)

export default StreetMapContainer
