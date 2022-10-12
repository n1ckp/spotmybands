import * as React from "react";
import { GlobalStateContext } from "@utils/globalState";
import { format } from "date-fns";
import { Map } from "pigeon-maps";

import CustomMarker from './CustomMarker'

const styles = require("./StreetMap.scss").default;

const getMarkersFromState = (state: { [key: string]: any }) => {
  const markers = [];

  Object.values(state.events as { [key: string]: any }).forEach(
    (artistEvents) => {
      if (!artistEvents.hidden) {
        markers.push(...artistEvents.events);
      }
    }
  );

  return markers;
};

const StreetMap: React.FC = () => {
  const [selectedMarkerIndex, setSelectedMarkerIndex] = React.useState(
    undefined
  );
  const { state } = React.useContext(GlobalStateContext);

  const markers = getMarkersFromState(state);

  return (
    <div className={styles.container}>
      <Map center={[51.5502, -0.0034]} zoom={8}>
        {markers &&
          markers.map((marker, i) => {
            const { latitude, longitude } = marker.venue;

            return (
              <CustomMarker
                key={i}
                anchor={[latitude, longitude]}
                payload={1}
                onClick={() =>
                  setSelectedMarkerIndex(
                    selectedMarkerIndex === i ? undefined : i
                  )
                }
                open={selectedMarkerIndex === i}
                onCloseInfoBox={() => setSelectedMarkerIndex(undefined)}
              >
                <a
                  href={marker.songkickURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{marker.name}</h3>
                </a>
                <p>
                  <b>{marker.artist}</b>
                </p>
                <p>
                  {marker.date
                    ? format(Date.parse(marker.date), "dddd Do MMMM YYYY")
                    : null}
                </p>
              </CustomMarker>
            );
          })}
      </Map>
    </div>
  );
};

export default StreetMap;
