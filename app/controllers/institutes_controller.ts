import type { HttpContext } from '@adonisjs/core/http'

export default class InstitutesController {
  async index({ request }: HttpContext) {
    const { name } = request.body()
  }

  // edit institute
  async update({ request }: HttpContext) {
    const { name } = request.body()
  }
}
