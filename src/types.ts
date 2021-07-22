export type VimeoType = {
  /** Vimeo id */
  vimeoId: string
  /** Skip to a time in the video */
  skipTo?: {
    h?: number
    m: number
    s: number
  }
  /** Auto play the video */
  autoPlay?: boolean
}
