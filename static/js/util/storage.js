export const save = (key, value) => {
  const timestamp = Date.now()
  const expiry = Date.now() + 1000*60*60*24*365 // Set to expire in a year's time
  const data = JSON.stringify({
    timestamp,
    expiry,
    value,
  })
  window.localStorage.setItem(key, data)
}

export const load = (key, _default) => {
  const result = window.localStorage.getItem(key)

  if (!result) {
    return _default
  }

  const data = JSON.parse(result)

  if (Date.now() > data.expiry) {
    remove(key)
    return _default
  }

  return data.value
}

export const remove = key => {
  window.localStorage.removeItem(key)
}