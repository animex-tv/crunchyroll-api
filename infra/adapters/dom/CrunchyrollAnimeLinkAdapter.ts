import { DOMAdapter } from './DOMAdapter'

export class CrunchyrollAnimeLinkAdapter extends DOMAdapter {
  public handle() {
    const a = this.el.querySelector('a')

    if (!a) throw new Error(`Link not found in List Elements`)

    return {
      title: a.getAttribute('title'),
      url: `${a.getAttribute('href')}`,
    }
  }
}
