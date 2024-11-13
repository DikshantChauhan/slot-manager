import type { HttpContext } from '@adonisjs/core/http'

export default class SlotsController {
  async index({ request }: HttpContext) {
    const { instituteId } = request.body()
  }

  //
}
