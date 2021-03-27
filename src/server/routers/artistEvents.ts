import fetch from "node-fetch";
import { KEYS } from "../utils";

type VenueData = {
  name: string;
  latitude?: string;
  longitude?: string;
};

export const fetchEvents = async (args) => {
  const { artistName } = args;

  const getParams = new URLSearchParams();
  getParams.append("apikey", KEYS.SONGKICK_API_KEY);
  getParams.append("artist_name", artistName);

  const res = await fetch(
    `https://api.songkick.com/api/3.0/events.json?${getParams.toString()}`
  );
  const response = await res.json();
  console.log(response);
  return response;
};

const router = async (req, res) => {
  const args = req.query;
  if (!args.artistName) {
    res.sendStatus(404);
  }
  const eventsData = await fetchEvents(args);
  const artistEventsData = eventsData.resultsPage.results.event;

  const artistEvents = (artistEventsData || [])
    .map((event) => {
      const venue: VenueData = {
        name: event.venue.displayName,
      };

      if (event.venue.lat) {
        venue.latitude = event.venue.lat;
        venue.longitude = event.venue.lng;
      } else if (event.location && event.location.lat) {
        venue.latitude = event.location.lat;
        venue.longitude = event.location.lng;
      } else {
        // If can't find location, skip this event
        return null;
      }

      return {
        id: event.id,
        artist: args.artistName,
        venue,
        date: event.start.date,
        songkickURL: event.uri,
        name: event.displayName,
      };
    })
    .filter((e) => e != null);

  res.json({ artistEvents });
};

export default router;
