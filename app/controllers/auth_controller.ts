import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'

export default class AuthController {
  public async login({ request, auth, response }: HttpContext) {
    const { email, password } = await request.validateUsing(
      vine.compile(
        vine.object({
          email: vine.string().trim().email(),
          password: vine.string().trim().minLength(8),
        })
      )
    )

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      return response.json(user)
    } catch {
      return response.badRequest({ error: 'Invalid credentials' })
    }
  }

  public async me({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    return response.json(user)
  }
}
