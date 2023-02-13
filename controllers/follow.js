// Acciones de prueba

const pruebafollow = (req, res) => {
    return res.status(200).send({
        mensaje: 'Mensaje enviado desde: controller/follow.js'
    })
}




// Exportar acciones
module.exports = {
    pruebafollow
}