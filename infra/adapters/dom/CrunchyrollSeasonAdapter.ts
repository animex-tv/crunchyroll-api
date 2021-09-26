import { SeasonCrunchyroll } from '@core/domain/crunchyroll/SeasonCrunchyroll'
import { Crunchyroll } from 'Contracts/crunchyroll'
import { CrunchyrollVideoAdapter } from './CrunchyrollVideoAdapter'
import { DOMAdapter } from './DOMAdapter'

export class CrunchyrollSeasonAdapter extends DOMAdapter {
  public async handle() {
    const season = new SeasonCrunchyroll({
      title: this.el.querySelector('a.season-dropdown.block.text-link')?.innerHTML || '',
    })

    season.props.number = Number(season.props.title?.match(/S([0-9])/g)?.[0]?.replace('S', '')) || 1

    season.props.videos = await this.getVideos()

    return season.toJSON()
  }

  protected async getVideos() {
    const divs = Array.from(this.el.querySelectorAll('.portrait-grid .hover-bubble.group-item'))
    const scripts = Array.from(this.el.querySelectorAll('.portrait-grid script'))

    const videos: Crunchyroll.Video[] = []

    for (const videoDivKey in divs) {
      const videoDiv = divs[videoDivKey]
      const scriptEl = scripts[videoDivKey]
      videos.push(await new CrunchyrollVideoAdapter(videoDiv, scriptEl).handle())
    }

    return videos
  }
}
