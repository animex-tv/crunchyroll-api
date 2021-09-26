import { StrHelper } from '@helpers/StrHelper'

export class DOMAdapter {
  constructor(protected el: Element, protected strHelper = new StrHelper()) {}
}
