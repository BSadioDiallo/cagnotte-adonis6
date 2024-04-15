import handleModal from './modals'
import { handleLastPay } from './modals'
import { handleStudentModification } from './modals'
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
  try {
    handleLastPay()
  } catch (error) {
    console.error('last paiement absent')
  }
  try {
    const toggleModifyBtn = document.querySelector('#activate-button')
    if (toggleModifyBtn) {
      toggleModifyBtn.addEventListener('click', (event) => {
        handleStudentModification(event) // toggle inputs disabled attribute

        if (toggleModifyBtn.classList.contains('deactive')) {
          toggleModifyBtn
            .querySelector('img')
            .setAttribute('src', 'http://localhost:3333/assets/toggle_right.svg')
          toggleModifyBtn.classList.remove('deactive', 'bg-neutral-400')
          toggleModifyBtn.classList.add('bg-blue-400')
        } else {
          toggleModifyBtn
            .querySelector('img')
            .setAttribute('src', 'http://localhost:3333/assets/toggle_left.svg')
          toggleModifyBtn.classList.remove('bg-blue-400')
          toggleModifyBtn.classList.add('deactive', 'bg-neutral-400')
        }
      })
    } else {
      throw new Error('No modify button found')
    }
  } catch (error) {
    console.error(error.message)
  }
  if (toastElement) {
    removeToast()
  }
})
