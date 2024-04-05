import vine from '@vinejs/vine'

export const createStudentValidator = vine.compile(
  vine.object({
    matricule: vine.string().regex(/^[12][0-9]{6}$/),
    firstname: vine
      .string()
      .trim()
      .alpha({ allowDashes: false, allowSpaces: true, allowUnderscores: false })
      .toCamelCase()
      .minLength(2),
    lastname: vine
      .string()
      .trim()
      .alpha({ allowDashes: false, allowUnderscores: false, allowSpaces: false })
      .toCamelCase()
      .minLength(2),
    email: vine.string().trim().email(),
    contribution: vine.number().withoutDecimals().min(10000),
  })
)

export const updateStudentValidator = vine.compile(
  vine.object({
    matricule: vine.string().regex(/^[12][0-9]{6}$/),
    firstname: vine
      .string()
      .trim()
      .alpha({ allowDashes: false, allowSpaces: true, allowUnderscores: false })
      .toCamelCase()
      .minLength(2),
    lastname: vine
      .string()
      .trim()
      .alpha({ allowDashes: false, allowUnderscores: false, allowSpaces: false })
      .toCamelCase()
      .minLength(2),
    email: vine.string().trim().email(),
    contribution: vine.number().withoutDecimals().min(10000),
  })
)
