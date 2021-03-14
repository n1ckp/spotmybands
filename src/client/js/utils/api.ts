import { apiFetch } from '@utils/settings'

export async function fetchArtistEvents(artistName: string) {
  const response = await apiFetch(`/artist-events/?artistName=${encodeURI(artistName)}`)
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json()
  return data.artistEvents
}

export async function spotifySearchArtists(searchText: string) {
  const response = await apiFetch('/artist-search/', { q: searchText })
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json()
  return data.artists
}
