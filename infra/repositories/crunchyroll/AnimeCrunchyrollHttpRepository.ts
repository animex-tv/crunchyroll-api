import { CrunchyrollAnimeLinkAdapter } from '@infra/adapters/dom/CrunchyrollAnimeLinkAdapter'
import { CrunchyrollAnimePageAdapter } from '@infra/adapters/dom/CrunchyrollAnimePageAdapter'
import { CrunchyrollHttpRepository } from './CrunchyrollHttpRepository'

export class AnimeCrunchyrollHttpRepository extends CrunchyrollHttpRepository {
  public async getAnime(slug: string) {
    const page = await this.browserRepository.getDOM(this.withBaseUrl(slug))
    const adapter = new CrunchyrollAnimePageAdapter(slug, page.window.document.body)
    return adapter.handle()
  }

  public async getAllAnimes() {
    const path = 'videos/anime/alpha?group=all'
    const dom = await this.browserRepository.getDOM(this.withBaseUrl(path))

    const lis = Array.from(dom.window.document.querySelectorAll('li[itemscope].hover-bubble') || [])

    return lis.map((li) => {
      const adapter = new CrunchyrollAnimeLinkAdapter(li)
      const data = adapter.handle()
      return {
        ...data,
        url: `${this.baseURL}${data.url}`,
      }
    })
  }
}
