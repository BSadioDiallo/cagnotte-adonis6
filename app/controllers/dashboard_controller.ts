import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import Transaction from '#models/transaction'
import db from '@adonisjs/lucid/services/db'
export default class DashboardController {
  async index({ view }: HttpContext) {
    const amounts = await db.from('transactions').select('amount').orderBy('id', 'desc')
    const total = amounts.reduce((acc, curr) => acc + curr.amount, 0)

    return view.render('pages/dashboard/index', { total })
  }
  async show({ view }: HttpContext) {
    const students = await Student.all()

    return view.render('pages/dashboard/students', { students })
  }

  async transactions({ view }: HttpContext) {
    const transactions = await Transaction.all()

    return view.render('pages/dashboard/transactions', { transactions })
  }

  async print({ view, params }: HttpContext) {
    const { id } = params
    try {
      const transaction = await Transaction.findOrFail(id)
      const student = await Student.findOrFail(transaction.studentId)

      return view.render('pages/dashboard/transaction_print', { student, transaction })
    } catch (error) {
      console.error(error)
    }
  }
}
