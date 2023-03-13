export const { REACT_APP_API_SERVER } = process.env

function patchUrl(url: string) {
  if (url.startsWith('/')) {
    url = REACT_APP_API_SERVER + url
  }
  return url
}

function DELETE(url: string) {
  url = patchUrl(url)
  return fetch(url, { method: 'DELETE' })
}

function get(url: string) {
  url = patchUrl(url)
  return fetch(url)
}

function request(method: string, url: string, body?: object) {
  url = patchUrl(url)
  if (body === undefined) {
    return fetch(url, {
      method,
    })
  }
  if (body instanceof FormData) {
    return fetch(url, {
      method,
      body,
    })
  }
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

function post(url: string, body?: object) {
  return request('POST', url, body)
}

function patch(url: string, body?: object) {
  return request('PATCH', url, body)
}

export const api = {
  delete: DELETE,
  get,
  post,
  patch,
}
