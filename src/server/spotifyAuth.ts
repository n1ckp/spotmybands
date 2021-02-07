import fetch from 'node-fetch';
import { KEYS } from './utils';

export const auth = async () => {
  const authString = `${KEYS.SPOTIFY_CLIENT_ID}:${KEYS.SPOTIFY_CLIENT_SECRET}`
  const b64Key = Buffer.from(authString).toString('base64')
  console.log('base64', b64Key)
  const headers = {
    Authorization: `Basic ${b64Key}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  }
  const body = new URLSearchParams()
  body.append('grant_type', 'client_credentials')

  const res = await fetch(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      body,
      headers,
    }
  )
  const response = await res.json()
  console.log(response)
  return response
};

export default auth;
