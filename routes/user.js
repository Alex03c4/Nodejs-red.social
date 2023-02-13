const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const check = require('../middlewares/auth.js');

// Definir las rutas 
 router.get('/prueba-usuario',check.auth, UserController.pruebaUser)
 router.post('/register', UserController.register)
 router.post("/login", UserController.login)

 // Exportar router
module.exports = router