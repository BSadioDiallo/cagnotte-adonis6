import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async login({ view }: HttpContext) {
    return view.render('session/login')
  }
  async logout({ view, request, response }: HttpContext) {
    response.send('logout')
  }
  async destroy({ view, params }: HttpContext) {
    return view.render('session/destroy', { id: params.id })
  }
}
