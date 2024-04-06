function handleModal() {
  const modal = document.querySelector('#modal')
  const modalCloseButton = modal.querySelector('.close')
  const contributionButton = document.querySelector('#contribution-button')
  modalCloseButton.addEventListener('click', function () {
    modal.classList.toggle('hidden')
  })
  contributionButton.addEventListener('click', function () {
    modal.classList.toggle('hidden')
  })
}

export default handleModal
