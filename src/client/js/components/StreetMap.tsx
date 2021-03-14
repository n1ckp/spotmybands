import * as React from 'react'
import { GlobalStateContext } from '@utils/globalState'
import { format } from 'date-fns'
import { Map } from 'pigeon-maps'

const CloseIcon = require('@images/icons/close.svg').default
const MarkerIcon = require('@images/icons/map-marker.svg').default

const styles = require('./StreetMap.scss').default

type MarkerData = {
  name: string,
  artist: string,
  venue?: {
    latitude: number,
    longitude: number,
  },
  songkickURL?: string,
  date: string,
}

type CustomMarkerBaseProps = {
  top?: number,
  left?: number,
  open: boolean,
  children: React.ReactNode,
  onClick: (...args: any) => void,
  onCloseInfoBox: (...args: any) => void,
}

type CustomMarkerProps = CustomMarkerBaseProps & {
  payload: number,
  anchor: [number, number],
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ anchor, payload, top = 0, left = 0, open, children, onClick, onCloseInfoBox }) => (
  <div className={styles.marker} style={{ position: 'absolute', top: top - 12, left: left - 12 }} onClick={onClick}>
    <MarkerIcon className={styles.icon} />
    {open && (
      <div className={styles.infoBox}>
        <button className={styles.close} onClick={onCloseInfoBox}><CloseIcon /></button>
        {children}
      </div>
    )}
  </div>
)

const getMarkersFromState = (state: { [key: string]: any }) => {
  const markers = []

  Object.values(state.events as { [key: string]: any }).forEach(artistEvents => {
    if (!artistEvents.hidden) {
      markers.push(...artistEvents.events)
    }
  })

  return markers
}

const StreetMap: React.FC = () => {
  const [selectedMarkerIndex, setSelectedMarkerIndex] = React.useState(undefined)
  const { state } = React.useContext(GlobalStateContext)

  const markers = getMarkersFromState(state)

  return (
    <div className={styles.container}>
      <Map center={[51.5502, -0.0034]} zoom={8}>
        {markers && markers.map((marker, i) => {
          const { latitude, longitude } = marker.venue

          return (
            <CustomMarker
              key={i}
              anchor={[latitude, longitude]}
              payload={1}
              onClick={() => setSelectedMarkerIndex(selectedMarkerIndex === i ? undefined : i)}
              open={selectedMarkerIndex === i}
              onCloseInfoBox={() => setSelectedMarkerIndex(undefined)}>
              <a href={marker.songkickURL} target="_blank" rel="noopener noreferrer"><h3>{marker.name}</h3></a>
              <p><b>{marker.artist}</b></p>
              <p>{marker.date ? format(Date.parse(marker.date), 'dddd Do MMMM YYYY') : null}</p>
            </CustomMarker>
          )
        })}
      </Map>
    </div>
  )
}

export default StreetMap
