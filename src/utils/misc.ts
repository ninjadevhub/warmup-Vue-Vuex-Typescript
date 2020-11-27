export function appendUrlSearchParams (url: URL, params: { [key: string]: any }, prefix = '') {
  const name = (key: string) => prefix ? `${prefix}[${key}]` : key
  Object.keys(params)
    .filter((key: string) => params[key] !== null)
    .forEach((key: string) => {
      if (Array.isArray(params[key])) {
        params[key].forEach((item: any) => appendUrlSearchParams(url, { [`${key}[]`]: item }, prefix))
      } else {
        typeof params[key] === 'object'
          ? appendUrlSearchParams(url, params[key], name(key))
          : url.searchParams.append(name(key), params[key])
      }
    })
}

export function appendDataToUrlQueryString (url: string, base: string, data: { [key: string]: any }) {
  const obj = new URL(url, base)
  appendUrlSearchParams(obj, data)

  return obj.href
}
