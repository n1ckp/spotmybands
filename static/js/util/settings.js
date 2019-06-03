import fetch from 'isomorphic-fetch'

export const apiRoot = (process.env.NODE_ENV === 'test') ? 'http://localhost:3000/api' : '/api'

export const apiFetch = (path, postData) => {
  let params = {
    headers:     {'Content-Type': 'application/json', 'X-CSRFToken': csrfToken},
    credentials: 'same-origin',
  }

  if (postData) {
    params.method = 'POST'
    params.body = JSON.stringify({
      access_token: appData.SpotifyAccessToken,
      ...postData,
    })
  }

  return fetch(`${apiRoot}${path}`, params)
}
