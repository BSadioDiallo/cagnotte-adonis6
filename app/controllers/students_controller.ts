import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import Transaction from '#models/transaction'
import { createStudentValidator, updateStudentValidator } from '#validators/student'

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
      return view.render('pages/errors/not_found')
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
  async update({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(updateStudentValidator)

    try {
      const student = await Student.findOrFail(payload.id)
      student.merge(payload)
      try {
        await student.save()
      } catch (error) {
        session.flash('error', 'Ce matricule est déjà utilisé.')
        return response.redirect().back()
      }
      session.flash('success', 'Informations mises à jour avec succès.')
      response.redirect().toRoute('student.show', { id: student.id })
    } catch (error) {
      console.error(error)

      session.flash('error', 'Une erreur est survenue lors de la mise à jour.')
      response.redirect().back()
    }
  }
}
