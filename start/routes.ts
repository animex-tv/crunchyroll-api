import Route from '@ioc:Adonis/Core/Route'

Route.get('/anime/:lang/:slug', 'AnimesController.find')
