interface Data {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

function fetcher(url: string, data: undefined | Data = undefined) {
  return fetch(`${window.location.origin}/api/${url}`, {
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (res.status > 399 && res.status < 200) {
      throw new Error('')
    }
    return res.json()
  })
}

export default fetcher
