import axios from 'axios'

export const createCrunchyrollClient = () => {
  return axios.create({
    baseURL: 'https://www.crunchyroll.com',
    headers: {
      'Accept': '*/*',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 Edg/93.0.961.52',
    },
  })
}
