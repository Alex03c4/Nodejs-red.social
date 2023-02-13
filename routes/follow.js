const express = require('express');
const router = express.Router();
const FollowController = require('../controllers/follow');

// Definir las rutas 
 router.get('/prueba-Follow', FollowController.pruebafollow);


 // Exportar router
module.exports = router;