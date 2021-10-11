const express = require('express')
// const swaggerUi = require('swagger-ui-express')
// const swaggerJsdoc = require('swagger-jsdoc')



module.exports = (authMiddleware, validateDto, controllers) => {
  const router = express.Router()

  router.get('/', (req, res, next) => {
    res.send('Hello world!')
  })


  // Auth
  router.use('/api', require('./auth')(controllers, validateDto))


  // All routes from this point will use the auth middleware
  router.use(authMiddleware)
  router.use('/api/user-details', require('./userDetails')(controllers, validateDto))


  return router
}
