import { VideoCrunchyroll } from '@core/domain/crunchyroll/VideoCrunchyroll'
import { Crunchyroll } from 'Contracts/crunchyroll'
import { CrunchyrollImagesAdapater } from './CrunchyrollImagesAdapter'
import { DOMAdapter } from './DOMAdapter'

export class CrunchyrollVideoAdapter extends DOMAdapter {
  constructor(protected el: Element, protected script: Element) {
    super(el)
  }

  public async handle() {
    const startObject = this.script.innerHTML.search("bubble_data', ")
    const object = JSON.parse(
      this.script.innerHTML.substring(startObject).replace("bubble_data', ", '').replace(');', '')
    )

    const video = new VideoCrunchyroll({
      path: this.el.querySelector('a.portrait-element')?.getAttribute('href') || '',
      name: object.name || '',
      description: object.description,
    })

    video.props.number = Number(video.props.name.split('-')[0]?.trim()?.split(' ')?.pop())
    video.props.title = video.props.name.split('-')[1]?.trim()
    video.props.images = this.getImages(
      this.el.querySelector('a.portrait-element img')?.getAttribute('src') || ''
    )

    return video.toJSON()
  }

  protected getImages(url: string): Crunchyroll.AnimeImages {
    return new CrunchyrollImagesAdapater().handle(url)
  }
}
