export declare namespace API {
  export interface Response<T = unknown> {
    code: number
    message: string
    data: T
  }
}
