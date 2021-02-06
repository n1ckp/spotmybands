import fetch from 'node-fetch';

export const searchArtists = async (args) => {
  const { q, accessToken } = args
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }
  const getParams = new URLSearchParams()
  getParams.append('q', q)
  getParams.append('type', 'artist')

  const res = await fetch(
    `https://api.spotify.com/v1/search?${getParams.toString()}`,
    {
      method: 'GET',
      headers,
    }
  )
  const response = await res.json()
  console.log(response)
  return response
};


const router = async (req, res) => {
  const args = req.body
  if (!args.accessToken || !args.q) {
    res.sendStatus(404);
  }
  console.log(args)

  const response = await searchArtists(args);

  if (!response.artists || !response.artists.items) {
    res.sendStatus(404);
  }

  const artists = response.artists.items.map(a => ({
    id: a.id,
    name: a.name,
    logoURL: a.images ? a.images[0].url : undefined,
    genres: a.genres,
  }))

  res.json({ artists });
};

export default router;
