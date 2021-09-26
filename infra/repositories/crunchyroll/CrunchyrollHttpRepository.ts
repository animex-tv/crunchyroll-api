import { CrunchyrollLangs } from 'Contracts/crunchyroll'
import { createCrunchyrollClient } from '@infra/clients/http'
import { HttpRepository } from '../HttpRepository'
import { BrowserRepository } from '../BrowserRepository'

export class CrunchyrollHttpRepository extends HttpRepository {
  protected baseURL = 'https://www.crunchyroll.com'
  constructor(
    protected lang: CrunchyrollLangs = 'pt-br',
    protected browserRepository = new BrowserRepository()
  ) {
    super()

    this.client = createCrunchyrollClient()
  }

  protected getLangNamespaceUri() {
    if (this.lang === 'en-us') return '/'

    return `/${this.lang}/`
  }

  protected withBaseUrl(path: string) {
    return `${this.baseURL}${this.getLangNamespaceUri()}${path}`
  }
}
