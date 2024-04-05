/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
const SessionController = () => import('#controllers/session_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const StudentController = () => import('#controllers/students_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.named({
  auth: () => import('#middleware/auth_middleware'),
})

router
  .group(() => {
    router.post('/login', [SessionController, 'login'])
    router.post('/signin', [SessionController, 'logout'])
    router.get('/logout', [SessionController, 'destroy'])
  })
  .use([middleware.auth()])

router.get('/', [DashboardController, 'index']).as('home')
router.get('/dashboard', [DashboardController, 'show']).as('dashboard.students')
router.get('/transactions', [DashboardController, 'transactions']).as('dashboard.transactions')
router.get('/students', [StudentController, 'index']).as('student.index')
router.get('/students/:id', [StudentController, 'show']).as('student.show')
router.post('/students', [StudentController, 'store']).as('student.store')