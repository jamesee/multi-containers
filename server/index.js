require('dotenv').config()
const App = require('./app')
const Router = require('./routes')
const AuthMiddleware = require('./middlewares/auth')
const AuthService = require('./services/auth')
const Controllers = require('./controllers')
const Validations = require('./validations')

const db = require('./db')
const schema = require('./dto')
const ApiError = require('./errors/api-error')

const authService = AuthService(db, ApiError)
const authMiddleware = AuthMiddleware(authService, ApiError)
const controllers = Controllers(db, authService, ApiError)
const validateDto = Validations(schema)
const router = Router(authMiddleware, validateDto, controllers)
const app = App(router)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})