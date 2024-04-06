const toggleMenuBtn = document.querySelector('#menu-btn')
const toggleMenuImg = document.querySelector('#menu-btn img')
const toggledMenu = document.querySelector('#toggled-menu')
const menuLinks = document.querySelector('#main-nav ul a')
const toastElement = document.querySelector('#toast')

toggleMenuBtn.addEventListener('click', toggleNav)

function toggleNav() {
  toggledMenu.classList.toggle('-translate-y-full')

  if (toggledMenu.classList.contains('-translate-y-full')) {
    toggleMenuImg.setAttribute('src', 'assets/menu.svg')
    toggleMenuBtn.setAttribute('aria-expanded', 'false')
  } else {
    toggleMenuImg.setAttribute('src', 'assets/cross.svg')
    toggleMenuBtn.setAttribute('aria-expanded', 'true')
  }
}
toastElement.addEventListener('', removeToast)

function removeToast() {
  // toastElement.querySelector('svg').addEventListener('click', () => {
  //   toastElement.setAttribute('display', 'none')
  // })

  setTimeout(() => {
    toastElement.setAttribute('display', 'none')
    setTimeout(() => {
      toastElement.remove()
    }, 300)
  }, 5000)
}

window.addEventListener('DOMContentLoaded', () => {
  if (toastElement) {
    removeToast()
  }
})
