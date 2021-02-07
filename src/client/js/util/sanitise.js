export const sanitiseArtistEvents = artistEventsObj => {
  if (!artistEventsObj) {
    return {}
  }
  Object.keys(artistEventsObj).forEach(artistKey => {
    if (typeof artistEventsObj[artistKey].events === 'undefined') {
      artistEventsObj[artistKey].events = []
    }
  })
}
