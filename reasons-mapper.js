// Reasons.js
// Copyright (c) 2017 Dave Kinkead
// Available under the MIT license


const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
const fontSize = 14
const boxPaddingFactor = 1
const boxHeightInLines = 3
const boxHeight = fontSize * (boxHeightInLines + 2.5)
const boxWidth = (width) => {
  return (parseInt(width)+boxPaddingFactor) * fontSize/2
}
const reasons = []
const relations = []

let clicks = 1    // this is a temp id marker
let currentReason

let svg = buildNS('svg', {}, {height: screenHeight,  version: '1.1', width: screenWidth, xmlns: "http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"})
document.querySelector('#canvas').appendChild(svg)

document.querySelector('#canvas').addEventListener('dblclick', (event) => {
  let reason = new Reason('Lorem ipsum dolor sit amet, ut mattis risus suspendisse natoque, pede ipsum massa quam nam nec parturient.', event.clientX, event.clientY)
})


//  Object Constructors

function Reason(content, x, y) {

  let reason = build('div', {id: clicks++}, {
    class:'reason',
    x: x,
    y: y, 
    style: 'position: absolute; top: '+y+'px; left: '+x+'px;',
    draggable: true
  })

  reason.innerHTML = content

  reason.addEventListener('dragstart', (event) => {
    currentReason = event.target
    event.target.classList.add('current')
    event.dataTransfer.setData('text/html', event.target.outerHTML)
    event.dataTransfer.effectAllowed = "copy"
  })

  reason.addEventListener('drag', (event) => {
    // console.log(event) //.clientX+','+event.clientY)
  }, false)

  reason.addEventListener('dragend', (event) => {
    currentReason = event.target
    event.target.classList.remove('current')
  })

  reason.addEventListener('dragenter', (event) => {
    event.preventDefault()
    if (event.target.classList)
      event.target.classList.add('droppable')
  }, false)

  reason.addEventListener('dragover', (event) => {
    event.preventDefault()
  })

  reason.addEventListener('dragleave', (event) => {
    if (event.target.classList)
      event.target.classList.remove('droppable')
  }, false)

  reason.addEventListener('drop', (event) => {
    event.preventDefault()
    event.target.classList.remove('droppable')
    if (currentReason.id !== event.target.id)
      relations.push(new Relation(currentReason, 'supports', event.target))
  }, false)

  document.querySelector('#canvas').appendChild(reason)
  return reason
}

function Relation(element, type, target) {
  this.element = element
  this.type = type
  this.target = target

  let ec = getCenter(element)
  let tc = getCenter(target)

  let path = buildNS('path', {id: element.id+ '-' +target.id}, {
    stroke: '#CCC',
    'stroke-width': 5,
    d: 'M'+ec.x+' '+ec.y+' L '+tc.x+' '+tc.y
  })

  svg.appendChild(path)

  return this
}


//  Helper Functions

function getCenter(element) {
  let box = element.getBoundingClientRect()
  return {x: box.x + (box.right-box.left)/2, y: box.y + (box.bottom-box.top)/2}
}

function overlaps(a, b) {
  return (a.x < (b.x + b.width) && (a.x + a.width) > b.x &&
    a.y < (b.y + b.height) && (a.y + a.height) > b.y) ? true : false
}

//  element build helpers -- extract these later
function buildNS(type, options, attributes) {
  let node = document.createElementNS('http://www.w3.org/2000/svg', type)
  for (var key in options) {
    node[key] = options[key]
  }
  for (var key in attributes) {
    node.setAttribute(key, attributes[key])
  }
  return node
}

function build(type, options, attributes) {
  let node = document.createElement(type)
  for (var key in options) {
    node[key] = options[key]
  }
  for (var key in attributes) {
    node.setAttribute(key, attributes[key])
  }
  return node
}