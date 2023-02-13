// Acciones de prueba

const pruebapublication = (req, res) => {
    return res.status(200).send({
        mensaje: 'Mensaje enviado desde: controller/publication.js'
    })
}




// Exportar acciones
module.exports = {
    pruebapublication
}