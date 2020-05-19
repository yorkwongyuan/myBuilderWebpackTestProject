const express = require("express")
const { renderToString } = require('react-dom/server')

const server = (port) => {
  let app = express()
  app.use(express.static('dist'));
  app.get('/search', function (req, res) {

  })
}