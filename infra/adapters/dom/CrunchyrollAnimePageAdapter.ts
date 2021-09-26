import { AnimeCrunchyroll } from '@core/domain/crunchyroll/AnimeCrunchyroll'
import { Crunchyroll } from 'Contracts/crunchyroll'
import { CrunchyrollImagesAdapater } from './CrunchyrollImagesAdapter'
import { CrunchyrollSeasonAdapter } from './CrunchyrollSeasonAdapter'
import { DOMAdapter } from './DOMAdapter'

export class CrunchyrollAnimePageAdapter extends DOMAdapter {
  constructor(protected slug: string, protected el: Element) {
    super(el)
  }

  public async handle() {
    const anime = new AnimeCrunchyroll({
      title: this.getTitle(),
      path: `/${this.slug}`,
    })

    const sidebars = Array.from(this.el.querySelectorAll('#sidebar_elements .large-margin-bottom'))

    for (const sidebarIndex in sidebars) {
      const sidebar = sidebars[sidebarIndex]

      if (Number(sidebarIndex) === 0) {
        anime.props.images = this.getImages(sidebar.querySelector('img')?.getAttribute('src') || '')
      } else {
        const title = this.strHelper.slug(sidebar.querySelector('h3')?.innerHTML || '')
        if (title === 'sobre-a-serie') {
          anime.props.description = this.getDescription(sidebar)
        }

        if (title === 'informacoes-de-disponibilidade') {
          anime.props.warnings = this.getWarnings(sidebar)
        }
      }
    }

    anime.props.seasons = await this.getSeasons()

    return anime.toJSON()
  }

  protected getDescription(el: Element) {
    return this.strHelper.html.decode(
      el.querySelector('p.description span.more')?.innerHTML?.replace(/\n/g, '')?.trim() || ''
    )
  }

  protected getWarnings(el: Element) {
    const paragraphs = Array.from(el.querySelectorAll('p.availability-notes-low'))

    return paragraphs.map((p) => {
      return this.strHelper.html.decode(p.innerHTML)
    })
  }

  protected getTitle() {
    return (
      this.el
        .querySelector('#showview-content-header .ch-left .ellipsis span')
        ?.innerHTML?.trim() || ''
    )
  }

  protected getImages(url: string): Crunchyroll.AnimeImages {
    return new CrunchyrollImagesAdapater().handle(url)
  }

  protected async getSeasons() {
    const divs = Array.from(
      this.el.querySelectorAll('#showview_content_videos ul.list-of-seasons li.season')
    )
    const seasons: Crunchyroll.Season[] = []

    for (const seasonDiv of divs) {
      seasons.push(await new CrunchyrollSeasonAdapter(seasonDiv).handle())
    }

    return seasons
  }
}
