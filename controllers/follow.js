// Importar modelo
const follow = require("../models/follow")
const Follow = require("../models/follow")
const User = require("../models/user")



// Acciones de prueba
const pruebaFollow = (req, res) => {
    return res.status(200).send({
        mensaje: 'Mensaje enviado desde: controller/follow.js'
    })
}

// Acción de guardar un follow (acción seguir)
const save = (req, res) => {
    // Conseguir datos por body
    const params = req.body

    // Sacar id del usuario identificado
    const identity = req.user

    // Crear objeto con modelo follow
    let userToFollow = new Follow({
        user: identity.id,
        followed: params.followed
    })

    // Guardar objeto en bbdd
    userToFollow.save((error, followStored) => {

        if (error || !followStored) {
            return res.status(500).send({
                status: "error",
                message: "No se ha podido seguir al usuario"
            })
        }

        return res.status(200).send({
            status: "success",
            identity: req.user,
            follow: followStored
        })
    })
}// Fin de save



// Exportar acciones
module.exports = {
    pruebaFollow,
    save
}