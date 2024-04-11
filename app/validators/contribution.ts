import vine from '@vinejs/vine'
import { SimpleMessagesProvider } from '@vinejs/vine'

export const contributionValidator = vine.compile(
  vine.object({
    amount: vine.number().withoutDecimals().min(100000),
  })
)

const messages = {
  required: 'Le montant est requis',
  number: 'Le montant doit être un nombre valide',
  withoutDecimals: 'Le montant ne doit pas contenir de décimales',
  min: 'Le montant doit être supérieur ou égal à 100000 GNF',
}

contributionValidator.messagesProvider = new SimpleMessagesProvider(messages)
