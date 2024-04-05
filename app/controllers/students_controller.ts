import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import Transaction from '#models/transaction'
import { createStudentValidator } from '#validators/student'

export default class StudentsController {
  async index({ view }: HttpContext) {
    return view.render('pages/students/index')
  }
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createStudentValidator)
    const student = await Student.create(payload)

    if (payload.contribution > 0) {
      const transaction = new Transaction()
      transaction.amount = payload.contribution
      transaction.studentId = student.id
      await transaction.save()
      await student.related('transactions').save(transaction)
      response.status(200)
      response.redirect().back()
      return
    }

    response.send('not stored')
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
