import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import Transaction from '#models/transaction'
import { contributionValidator } from '#validators/contribution'

const MAX_CONTRIBUTION = 400000
const CONTRIBUTION_MULTIPLE = 5000
export default class StudentApisController {
  async contribute({ request, response, params, session }: HttpContext) {
    const { id } = params
    const { amount } = await request.validateUsing(contributionValidator)

    session.clear()

    try {
      const student = await Student.findOrFail(id)
      if (amount % CONTRIBUTION_MULTIPLE !== 0) {
        session.flash('error', 'Le montant de la contribution doit être un multiple de 5000 GNF')
        response.redirect().back()
        return
      }
      if (student.contribution + amount > MAX_CONTRIBUTION) {
        session.flash('error', 'La contribution maximale est de 400 000 GNF')
        response.redirect().back()
        return
      }

      const transaction = new Transaction()
      transaction.amount = amount
      transaction.studentId = student.id
      await transaction.save()
      student.contribution += amount
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
