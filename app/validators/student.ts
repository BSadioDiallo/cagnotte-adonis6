import vine from '@vinejs/vine'
import { SimpleMessagesProvider } from '@vinejs/vine'

export const createStudentValidator = vine.compile(
  vine.object({
    matricule: vine.string().regex(/^[12][0-9]{6}$/),
    firstname: vine
      .string()
      .trim()
      .alpha({ allowDashes: false, allowSpaces: true, allowUnderscores: false })
      .toUpperCase()
      .minLength(2),
    lastname: vine
      .string()
      .trim()
      .alpha({ allowDashes: false, allowUnderscores: false, allowSpaces: false })
      .toUpperCase()
      .minLength(2),
    email: vine.string().trim().email(),
    contribution: vine.number().withoutDecimals().min(10000),
  })
)

const messages = {
  'matricule': 'le {{ field }} doit être composé de 7 chiffres et commencer par 1 ou 2',
  'matricule.required': 'le {{ field }} est obligatoire',
  'matricule.unique': 'le {{ field }} est déjà utilisé',
  'firstname': 'Le prénom ne doit pas contenir de caractères spéciaux',
  'lastname': 'Le nom ne doit pas contenir de caractères spéciaux',
  'email': "L'adresse {{ field }} n'est pas valide",
  'contribution': 'Le montant doit être supérieur ou égal à 10000 GNF',
}

createStudentValidator.messagesProvider = new SimpleMessagesProvider(messages)
