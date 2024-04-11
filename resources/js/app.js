import handleModal from './modals'

const toggleMenuBtn = document.querySelector('#menu-btn')
const toggleMenuImg = document.querySelector('#menu-btn img')
const toggledMenu = document.querySelector('#toggled-menu')
const toastElement = document.querySelector('#toast')

toggleMenuBtn.addEventListener('click', toggleNav)

function toggleNav() {
  toggledMenu.classList.toggle('-translate-y-full')

  if (toggledMenu.classList.contains('-translate-y-full')) {
    toggleMenuImg.setAttribute('src', 'http://localhost:3333/assets/menu.svg')
    toggleMenuBtn.setAttribute('aria-expanded', 'false')
  } else {
    toggleMenuImg.setAttribute('src', 'http://localhost:3333/assets/cross.svg')
    toggleMenuBtn.setAttribute('aria-expanded', 'true')
  }
}
try {
  toastElement.addEventListener('click', removeToast)
} catch (error) {
  console.error('No toast element found')
}

function removeToast() {
  // toastElement.querySelector('svg').addEventListener('click', () => {
  //   toastElement.setAttribute('display', 'none')
  // })

  setTimeout(() => {
    toastElement.setAttribute('display', 'none')
    setTimeout(() => {
      toastElement.remove()
    }, 300)
  }, 6000)
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    handleModal()
  } catch (error) {
    console.error('modal de paiements absent')
  }
  if (toastElement) {
    removeToast()
  }
})
