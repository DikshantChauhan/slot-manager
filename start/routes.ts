/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AuthController = () => import('#controllers/auth_controller')
const InstitutesController = () => import('#controllers/institutes_controller')
const SlotsController = () => import('#controllers/slots_controller')
//auth
router.post('/login', [AuthController, 'login'])
router.get('/me', [AuthController, 'me']).middleware(middleware.auth())

//slots
router.get('/institute/slots/list', [SlotsController, 'slotsByDate']).middleware(middleware.auth())
router.get('/me/slots/list', [SlotsController, 'meBookedSlots']).middleware(middleware.auth())
router.post('/me/slots/book', [SlotsController, 'bookSlot']).middleware(middleware.auth())

//institutes
router.put('/institutes/edit', [InstitutesController, 'update']).middleware(middleware.admin())
