import { CrunchyrollLangs } from 'Contracts/crunchyroll'

export class CrunchyrollEntity<T extends Record<any, any>> {
  public props: T = {} as T

  constructor(props?: Partial<T>, public lang: CrunchyrollLangs = 'pt-br') {
    if (props) {
      this.props = {
        ...this.props,
        ...props,
      }
    }
  }

  public toString() {
    return JSON.stringify(this.props)
  }

  public toJSON() {
    return this.props
  }
}
