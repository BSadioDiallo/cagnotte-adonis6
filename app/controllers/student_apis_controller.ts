import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import Transaction from '#models/transaction'
import { contributionValidator } from '#validators/contribution'
import { lastContributionValidator } from '#validators/contribution'

const MAX_CONTRIBUTION = 400000
const CONTRIBUTION_MULTIPLE = 5000
export default class StudentApisController {
  async contribute({ request, response, params, session }: HttpContext) {
    const { id } = params
    const { amount } = await request.validateUsing(contributionValidator)

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
      transaction.studentMatricule = student.matricule
      student.contribution += amount

      await transaction.save()
      await student.related('transactions').save(transaction)

      session.flash('success', 'Transaction effectuer avec succès')
      response.redirect().back()
    } catch (error) {
      response.status(400)
      session.flash('error', 'Une erreur est survenu pendant la transaction')
      console.log(error)
      response.redirect().back()
    }

    return
  }

  async payLeft({ request, response, params, session }: HttpContext) {
    const { id } = params
    const payload = await request.validateUsing(lastContributionValidator)

    try {
      const student = await Student.findOrFail(id)
      const transaction = new Transaction()
      transaction.amount = payload.amount
      transaction.studentId = student.id
      transaction.studentMatricule = student.matricule

      await transaction.save()
      student.contribution += payload.amount
      await student.related('transactions').save(transaction)

      session.flash('success', 'Dernier montant payer avec succès')
      response.redirect().back()
    } catch (error) {
      console.error(error)

      session.flash('error', 'Une erreur est survenue')
      response.redirect().back()
    }
  }
}
