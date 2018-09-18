'use strict'

const Graph = require('./graph')
const UI = require('./ui')
const View = require('./view')


/**
 * This module wraps the DOM UI, Canvas renderer, and Graph data
 */
module.exports = Mapper


/**
 * The Mapper acts as the UI between the Graph data object and the browser DOM.
 * It is responsible for handling all mouse and keyboard events, and sending 
 * changes in the argument map to the Graph object.
 *
 * The Map contains references to @graph (the data) and @DOM (the DOM object)
 *
 * @params elementID  the element id to append the map canvas to
 */
function Mapper (elementID) {

  //  get the DOM element
  this.DOM = document.querySelector(elementID)

  //  attach the canvas and event listeners to the HTML if the reference was valid
  if (this.DOM) {
    View.init(this)
    UI.addEventListeners(this)
  }
}


/**
 * Populates a Graph with nodes and edges.
 *
 * @params elements   the elements to render
 */
Mapper.prototype.render = function (elements) {
  // console.log(elements)
  this.graph = new Graph(elements)
  View.zero(this)
  View.draw(this)
  return this
}


/**
 * Exports a Graph's data structure as an Array
 */
Mapper.prototype.export = function () {
  return this.graph.map(element => element.export())
}