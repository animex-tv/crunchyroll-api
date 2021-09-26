import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { AnimeCrunchyrollHttpRepository } from '@infra/repositories/crunchyroll/AnimeCrunchyrollHttpRepository'

export default class AnimesController {
  public async find({ params }: HttpContextContract) {
    const { lang, slug } = params
    const animeRepository = new AnimeCrunchyrollHttpRepository(lang)
    return animeRepository.getAnime(slug)
    // return animeRepository.getAllAnimes()
  }
}
