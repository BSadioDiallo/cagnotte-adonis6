function handleModal() {
  const modal = document.querySelector('#modal')
  const modalCloseButton = modal.querySelector('.close')
  const contributionButton = document.querySelector('#contribution-button')
  modalCloseButton.addEventListener('click', function () {
    modal.classList.toggle('hidden')
    modal.classList.toggle('flex')
  })
  contributionButton.addEventListener('click', function () {
    modal.classList.toggle('flex')
    modal.classList.toggle('hidden')
  })
}
function HandleStudentModification() {
  const studentInformatinsFields = Array.from(document.querySelectorAll('dd'))
  const inputsArray = []
  for (field in studentInformatinsFields) {
    const input = document.createElement('input')
    input.value = studentInformatinsFields[field].textContent
    inputsArray.push(input)
  }
}

export function handleLastPay() {
  const form = document.querySelector('#payleft-form')
  const button = form.querySelector('button')
  const payleftButton = document.querySelector('#payleft-button')
  payleftButton.addEventListener('click', () => {
    form.classList.toggle('flex')
    form.classList.toggle('hidden')
  })
  button.addEventListener('click', () => {
    form.classList.toggle('hidden')
    form.classList.toggle('flex')
  })
}
export default handleModal
