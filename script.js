const root = document.documentElement
const boxes = [...document.querySelectorAll('.box')]
const contents = [...document.querySelectorAll('.content')]
const inputs = [...document.querySelectorAll('input')]

const getProp = (el, prop) => Math.ceil(parseInt(window.getComputedStyle(el).getPropertyValue(prop)))
const getWidth = el => Math.ceil(el.offsetWidth)
const getRelativeWidth = el => Math.ceil(getProp(el, 'width') / getProp(el.parentNode, 'width') * 100)

document.querySelector('.relativeWidth').textContent = `${getRelativeWidth(boxes[0])}%`

const renderContentWidth = arr => arr.forEach(el => el.textContent = `Content width: ${getWidth(el)}px`)
const renderStaticElements = arr => arr.forEach(el => el.insertAdjacentHTML('afterbegin', `
  <span class="box-border">border-width: ${getProp(el, 'border-width')}px</span>
  <span class="box-padding">padding: ${getProp(el, 'padding')}px</span>
`))

const results = [
  box => `while expected box width: ${getRelativeWidth(box)}% of the parent element
    (<span class="expectedBoxWidth">${getWidth(box.querySelector('.content'))}</span>px)`,
  box => `matches the expected box width: ${getRelativeWidth(box)}% of the parent element
    (<span class="expectedBoxWidth">${getWidth(box)}</span>px)`
]

const renderDescription = () => boxes.forEach((box, i) => box.insertAdjacentHTML('afterend', `
  <p>
    Total box width = <span class="totalBoxWidth">${getWidth(box)}</span>px, where
  </p>
  <p>
    border: ${getProp(box, 'border-width') * 2}px (${getProp(box, 'border-width')}px &times; 2) +
    padding: ${getProp(box, 'padding') * 2}px (${getProp(box, 'padding')}px &times; 2) +
    content: <span class="contentWidth">${getWidth(contents[i])}</span>px,
  </p>
  <p>
    ${results[i](box)}
  </p>
`))

renderContentWidth(contents)
renderStaticElements(boxes)
renderDescription()

const handleResize = () => {
  renderContentWidth(contents)

  boxes.forEach((box, i) => {
    box.parentNode.querySelector('.totalBoxWidth').textContent = getWidth(box)
    box.parentNode.querySelector('.contentWidth').textContent = getWidth(contents[i])
    box.parentNode.querySelector('.expectedBoxWidth').textContent = i === 0 ? getWidth(contents[i]) : getWidth(box)
  })
}

const handleUserInput = function() {
  root.style.setProperty(`--${this.name}`, this.value)
}

window.addEventListener('resize', handleResize)
inputs.forEach(input => input.addEventListener('input', handleUserInput))

// TODO: Add visualization of the updated values from the user input
// TODO: Update with request animation frame?
