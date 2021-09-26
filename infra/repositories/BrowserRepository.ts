import { createBrowser } from '@infra/clients/browser/createBrowser'
import Application from '@ioc:Adonis/Core/Application'
import { DateTime } from 'luxon'
import { LocalStorage } from '@infra/storage/LocalStorage'
import { quickHash } from '@infra/helpers/quickHash'
import { JSDOM } from 'jsdom'

export class BrowserRepository {
  constructor(protected storage = new LocalStorage()) {}

  public async getHtml(url: string) {
    console.log('[getHTML]', url)
    const contents = await this.getSavedPage(url)
    if (contents) return contents.toString()
    const browser = await createBrowser({
      headless: true,
    })
    const [page] = await browser.pages()
    await page.goto(url)
    await page.screenshot({
      path: Application.tmpPath(
        'screenshots',
        `screenshot-${DateTime.now().toFormat('HH-mm-ss')}.png`
      ),
      fullPage: true,
    })

    const html = await page.evaluate(() => document.querySelector('*')?.outerHTML)

    await browser.close()

    await this.savePage(url, html || '')

    return html || ''
  }

  public async getDOM(url: string) {
    const html = await this.getHtml(url)

    return new JSDOM(html)
  }

  private async savePage(url: string, html: string) {
    await this.storage.setContents(`cache/requests/${quickHash(url)}`, html)
  }

  private async getSavedPage(url: string) {
    return this.storage.getContents(`cache/requests/${quickHash(url)}`)
  }
}
