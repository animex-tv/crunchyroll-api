export type CrunchyrollLangs = 'pt-br' | 'en-gb' | 'en-us'

export namespace Crunchyroll {
  export type ImageType =
    | 'wide'
    | 'thumb'
    | 'main'
    | 'full'
    | 'small'
    | 'large'
    | 'medium'
    | 'widestar'

  export type AnimeImages = Record<ImageType, string>
  export type VideoImages = Record<ImageType, string>

  export interface Video {
    name: string
    number: number
    title: string
    label: string
    images: VideoImages
    path: string
    description: string
  }

  export interface Season {
    title?: string
    number?: number
    videos: Video[]
  }

  export interface Anime {
    title: string
    description: string
    images: AnimeImages
    seasons: Season[]
    warnings: string[]
    path: string
  }
}
