import Student from '#models/student'
import Transaction from '#models/transaction'
import type { HttpContext } from '@adonisjs/core/http'

export default class StudentApisController {
  async contribute({ request, response, params, session }: HttpContext) {
    const { id } = params
    const { amount } = request.all()

    session.clear()

    try {
      const student = await Student.findOrFail(id)
      const transaction = new Transaction()
      transaction.amount = amount
      transaction.studentId = student.id
      await transaction.save()
      student.contribution += Number.parseFloat(amount)
      await student.related('transactions').save(transaction)
      session.flash('success', 'Transaction effectuer avec succès')
      response.redirect().back()
    } catch (error) {
      response.status(400)
      session.flash('error', 'Une erreur est survenu pendant la transaction')
      response.redirect().back()
    }
  }
}
