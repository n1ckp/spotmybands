import { apiFetch } from "@utils/settings";
import { save, load } from "@utils/storage";
import { sanitiseArtistEvents } from "@utils/sanitise";

export const name = "events";

export const getInitialState = () =>
  sanitiseArtistEvents(load("userEvents")) || {};

export const actions = {
  FETCHING_ARTIST_EVENTS: "FETCH_ARTIST_EVENTS",
  RECEIVED_ARTIST_EVENTS: "RECEIVED_ARTIST_EVENTS",
  TOGGLE_ARTIST_EVENTS: "TOGGLE_ARTIST_EVENTS",
  REMOVE_USER_ARTIST: "REMOVE_USER_ARTIST",
};

interface ActionData {
  type: string;
  payload: {
    artistID?: string;
    artistEvents?: { [key: string]: any };
    isHidden: boolean;
  };
}

export function reducer(
  state = getInitialState(),
  { type, payload }: ActionData
) {
  let updatedState = Object.assign({}, state);
  switch (type) {
    case actions.FETCHING_ARTIST_EVENTS:
      updatedState[payload.artistID] = {
        loading: true,
        hidden: false,
        events: [],
      };
      break;
    case actions.RECEIVED_ARTIST_EVENTS:
      updatedState[payload.artistID] = {
        loading: false,
        hidden: false,
        events: payload.artistEvents,
      };
      break;
    case actions.TOGGLE_ARTIST_EVENTS:
      updatedState[payload.artistID] = {
        loading: false,
        hidden: payload.isHidden,
        events: state[payload.artistID].events,
      };
      break;
    case actions.REMOVE_USER_ARTIST:
      delete updatedState[payload.artistID];
      break;
  }
  save("userEvents", updatedState);
  return updatedState;
}

// Action creators
export const actionFetchArtistEvents = (dispatch, { artistName, artistID }) => {
  dispatch({ type: actions.FETCHING_ARTIST_EVENTS, payload: { artistID } });

  apiFetch(`/artist-events/?artistName=${encodeURI(artistName)}`)
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: actions.RECEIVED_ARTIST_EVENTS,
        payload: {
          artistID,
          artistEvents: data.artistEvents,
        },
      });
    });
};

export const actionToggleArtistEvents = (dispatch, { artistID, isHidden }) => {
  return dispatch({
    type: actions.TOGGLE_ARTIST_EVENTS,
    payload: {
      artistID,
      isHidden,
    },
  });
};
