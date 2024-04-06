import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import Transaction from '#models/transaction'
import { createStudentValidator } from '#validators/student'

export default class StudentsController {
  async index({ view }: HttpContext) {
    return view.render('pages/students/index')
  }

  async store({ request, response, session, view }: HttpContext) {
    const payload = await request.validateUsing(createStudentValidator)

    try {
      const student = await Student.create(payload)
      const transaction = new Transaction()
      transaction.amount = payload.contribution
      transaction.studentId = student.id
      await transaction.save()
      await student.related('transactions').save(transaction)

      response.redirect().back()
    } catch (error) {
      response.status(400)
      session.flash('error', 'Ce matricule est déjà utilisé.')
      return view.render('pages/students/index')
    }
  }

  async show({ view, params }: HttpContext) {
    try {
      const student = await Student.findOrFail(params.id)
      return view.render('pages/students/show', { student })
    } catch (error) {
      console.error(error)
    }

    return view.render('pages/dashboard/index')
  }
}
