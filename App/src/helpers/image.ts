export function toImageSrc(url: string): string {
  if (
    url.startsWith('/') ||
    url.startsWith('http://') ||
    url.startsWith('https://')
  ) {
    return url
  }
  return process.env.REACT_APP_USER_CONTENT_ORIGIN + '/' + url
}
