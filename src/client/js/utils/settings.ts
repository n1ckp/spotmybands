import * as fetch from 'isomorphic-fetch'

export const apiRoot = (process.env.NODE_ENV === 'test') ? 'http://localhost:3000/api' : '/api'

export const apiFetch = (path: string, postData?: { [key: string]: any }) => {
  let params: { [key: string]: string | Object } = {
    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': typeof window !== 'undefined' ? window.csrfToken : null },
    credentials: 'same-origin',
  }

  if (postData) {
    params.method = 'POST'
    params.body = JSON.stringify({
      accessToken: typeof window !== 'undefined' ? window.appData.accessToken : null,
      ...postData,
    })
  }

  return fetch(`${apiRoot}${path}`, params)
}
