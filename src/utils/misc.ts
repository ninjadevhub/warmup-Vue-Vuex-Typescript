import { EventBus } from '@/main'
import FlashMessage from '@/types/FlashMessage'
import { FailureResponse } from '@/types/Response'

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

export function getErrorMessage (response: FailureResponse) {
  return response.reason ? response.reason : 'Something is gone wrong, please contact support'
}

export function sendFlashMessage (flash: FlashMessage): void {
  EventBus.$emit('flash-message', flash)
}

export function copyToClipboard (string: string) {
  const fullLink = document.createElement('input')
  document.body.appendChild(fullLink)
  fullLink.value = string
  fullLink.select()
  document.execCommand('copy', false)
  fullLink.remove()
}
