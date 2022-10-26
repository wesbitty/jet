export type Fetch = typeof fetch

/**
 * Response format
 *
 */
export interface WesjetResponseSuccess<T> {
  data: T
  error: null
}
export interface WesjetResponseFailure {
  data: null
  error: any
}
export type WesjetResponse<T> = WesjetResponseSuccess<T> | WesjetResponseFailure

export class WesjetError extends Error {
  context: any
  constructor(message: string, name = 'WesjetError', context?: any) {
    super(message)
    super.name = name
    this.context = context
  }
}

export class WesjetFetchError extends WesjetError {
  constructor(context: any) {
    super('Failed to send a request to the Edge Function', 'WesjetFetchError', context)
  }
}

export class WesjetRelayError extends WesjetError {
  constructor(context: any) {
    super('Relay Error invoking the Edge Function', 'WesjetRelayError', context)
  }
}

export class WesjetHttpError extends WesjetError {
  constructor(context: any) {
    super('Edge Function returned a non-2xx status code', 'WesjetHttpError', context)
  }
}

export type WesjetInvokeOptions = {
  /**
   * object representing the headers to send with the request
   * */
  headers?: { [key: string]: string }
  /**
   * the body of the request
   */
  body?:
    | File
    | Blob
    | ArrayBuffer
    | FormData
    | ReadableStream<Uint8Array>
    | Record<string, any>
    | string
}
