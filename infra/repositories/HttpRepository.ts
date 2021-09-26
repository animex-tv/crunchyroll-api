import axios, { AxiosInstance } from 'axios'

export class HttpRepository {
  protected client: AxiosInstance

  constructor() {
    this.client = axios.create()
  }
}
