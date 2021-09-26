import puppeteer, { BrowserLaunchArgumentOptions } from 'puppeteer'
import Application from '@ioc:Adonis/Core/Application'

export function createBrowser(options?: BrowserLaunchArgumentOptions) {
  const args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
    '--window-size=1800,900',
    '--auto-open-devtools-for-tabs',
    '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
  ]

  const dir = Application.tmpPath('chromium')

  return puppeteer.launch({
    headless: true,
    args,
    userDataDir: dir,
    ignoreHTTPSErrors: true,
    ...(options || {}),
  })
}
