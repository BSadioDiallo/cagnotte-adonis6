import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import Transaction from '#models/transaction'
import { createStudentValidator } from '#validators/student'

export default class StudentsController {
  async index({ view }: HttpContext) {
    return view.render('pages/students/index')
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createStudentValidator)

    try {
      const student = await Student.create(payload)
      const transaction = new Transaction()
      transaction.amount = payload.contribution
      transaction.studentId = student.id
      transaction.studentMatricule = student.matricule

      await transaction.save()
      await student.related('transactions').save(transaction)

      session.flash('success', 'Étudiant créé avec succès.')
      response.redirect().back()
    } catch (error) {
      session.flash('error', 'Ce matricule est déjà utilisé.')
      console.error(error)
      response.redirect().back()
    }
  }

  async show({ view, params }: HttpContext) {
    try {
      const student = await Student.findOrFail(params.id)
      return view.render('pages/students/show', { student })
    } catch (error) {
      return view.render('pages/errors/404')
    }
  }
  async edit({ view, params }: HttpContext) {
    try {
      const student = await Student.findOrFail(params.id)
      return view.render('pages/students/edit', { student })
    } catch (error) {
      return view.render('pages/errors/not_found')
    }
  }
  async update({}: HttpContext) {}
}
