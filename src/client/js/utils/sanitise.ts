export const sanitiseArtistEvents = (artistEventsObj: { [key: string]: any }) => {
  if (!artistEventsObj) {
    return {}
  }
  Object.keys(artistEventsObj).forEach(artistKey => {
    if (typeof artistEventsObj[artistKey].events === 'undefined') {
      artistEventsObj[artistKey].events = []
    }
  })
}
