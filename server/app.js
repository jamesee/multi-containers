const express = require('express')
const logger = require('morgan')
const apiErrorHandler = require('./errors/api-error-handler');
const path = require('path')
const cors = require('cors')

module.exports = (router) => {
  const app = express()

  app.use(cors())
  app.use(express.urlencoded({extended: false}))
  app.use(express.json())
  app.use(logger('common'))
  app.use(express.static(path.resolve(__dirname,'../client/build')))
  app.use(router)
  app.use(apiErrorHandler);
  return app
}