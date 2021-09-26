import { Crunchyroll } from 'Contracts/crunchyroll'

export class CrunchyrollImagesAdapater {
  public handle(url: string) {
    const types: Crunchyroll.ImageType[] = [
      'full',
      'large',
      'main',
      'medium',
      'small',
      'thumb',
      'wide',
      'widestar',
    ]
    for (const type of types) {
      url = url.replace(`${type}.`, '{REPLACE_SIZE}')
    }
    const images: Crunchyroll.AnimeImages = {} as Crunchyroll.AnimeImages
    for (const type of types) {
      images[type] = url.replace('{REPLACE_SIZE}', `${type}.`)
    }

    return images
  }
}
