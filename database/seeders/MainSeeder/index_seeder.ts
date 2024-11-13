import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    // if (
    //   (!Seeder.default.environment.includes('development') && Application.inDev) ||
    //   (!Seeder.default.environment.includes('testing') && Application.inTest) ||
    //   (!Seeder.default.environment.includes('production') && Application.inProduction)
    // ) {
    //   return
    // }

    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../institute_seeder.js'))
    await this.runSeeder(await import('../user_seeder.js'))
    await this.runSeeder(await import('../slot_seeder.js'))
  }
}
