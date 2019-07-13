const root = document.documentElement
const contents = [...document.querySelectorAll('.content')]
const descs = [...document.querySelectorAll('.description')]
const inputs = [...document.querySelectorAll('input')]
const [inputWidth, inputPadding, inputBorder] = inputs

let width = +inputWidth.value
let padding = +inputPadding.value * 2
let border = +inputBorder.value * 2

const getWidth = el => +el.offsetWidth

contents.forEach(el => el.insertAdjacentHTML('beforeend', `
  <span class="content-width" data-medium>${getWidth(el)}px</span>
`))

descs[0].insertAdjacentHTML('beforeend', `
  <p data-medium><span class="calc-total">${width + padding + border}</span>px = <span class="width-desc">${width}</span>px + <span class="padding-desc">${padding}</span>px + <span class="border-width-desc">${border}</span>px</p>
`)

descs[1].insertAdjacentHTML('beforeend', `
  <p data-medium><span class="calc-content">${width - padding - border}</span>px = <span class="width-desc">${width}</span>px - <span class="padding-desc">${padding}</span>px - <span class="border-width-desc">${border}</span>px</p>
`)

const contentsWidth = [...document.querySelectorAll('.content-width')]

const handleUserInput = function() {
  const name = this.name
  const value = +this.value

  root.style.setProperty(`--${name}`, value)

  name === 'width' ? width = value :
  name === 'padding' ? padding = value * 2 :
  border = value * 2

  document.querySelectorAll(`.${name}-desc`).forEach(el => {
    el.textContent = name === 'width' ? width : value * 2
  })

  document.querySelector('.calc-total').textContent = width + padding + border
  document.querySelector('.calc-content').textContent = width - padding - border

  contentsWidth[0].textContent = `${width}px`
  contentsWidth[1].textContent = `${width - padding - border}px`
}

inputs.forEach(input => input.addEventListener('input', handleUserInput))
inputs.forEach(input => input.addEventListener('change', handleUserInput))
