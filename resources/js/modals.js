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

export default handleModal
