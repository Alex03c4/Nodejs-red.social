// Importar modulos
const fs = require("fs")
const path = require("path")
// Importar modelos
const Publication = require("../models/publication")
// Importar servicios
const followService = require("../services/followService")



// Acciones de prueba
const pruebaPublication = (req, res) => {
    return res.status(200).send({
        mensaje: 'Mensaje enviado desde: controller/publication.js'
    })
}// fin de prueba



// Guardar publicacion
const save = (req, res) => {
    // Recoger datos del body
    const params = req.body

    // SI no me llegan dar respuesta negativa
    if (!params.text) return res.status(400).send({ status: "error", "message": "Debes enviar el texto de la publicacion." })

    // Crear y rellenar el objeto del modelo
    let newPublication = new Publication(params)
    newPublication.user = req.user.id

    // Guardar objeto en bbdd
    newPublication.save((error, publicationStored) => {

        if (error || !publicationStored) return res.status(400).send({ status: "error", "message": "No se ha guardado la publicación." })

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Publicación guardada",
            publicationStored
        })
    })
}// fin de save



// Sacar una publicacion
const detail = (req, res) => {
    
    // Sacar id de publicacion de la url
    const publicationId = req.params.id

    // Find con la condicion del id
    Publication.findById(publicationId, (error, publicationStored) => {

        if (error || !publicationStored) {
            return res.status(404).send({
                status: "error",
                message: "No existe la publicacion"
            })
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Mostrar publicacion",
            publication: publicationStored
        })
    })
}// fin de detail

// Eliminar publicaciones
const remove = (req, res) => {
    // Sacar el id del publicacion a eliminar
    const publicationId = req.params.id

    // Find y luego un remove
    Publication.find({ "user": req.user.id, "_id": publicationId }).remove(error => {
        if (error) {
            return res.status(500).send({
                status: "error",
                message: "No se ha eliminado la publicacion"
            })
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Eliminar publicacion",
            publication: publicationId
        })
    })

}// fin de remove

// listar publicaciones de un usuario
const user = (req, res) => {
    // Sacar el id de usuario
    const userId = req.params.id

    // Controlar la pagina
    let page = 1

    if (req.params.page) page = req.params.page

    const itemsPerPage = 5

    // Find, populate, ordenar, paginar
    Publication.find({ "user": userId })
        .sort("-created_at")
        .populate('user', '-password -__v -role -email')
        .paginate(page, itemsPerPage, (error, publications, total) => {

            if (error || !publications || publications.length <= 0) {
                return res.status(404).send({
                    status: "error",
                    message: "No hay publicaciones para mostrar"
                })
            }

            // Devolver respuesta
            return res.status(200).send({
                status: "success",
                message: "Publicaciones del perfil de un usuario",
                page,
                total,
                pages: Math.ceil(total / itemsPerPage),
                publications,

            })
        })
}// fin de user






// Exportar acciones
module.exports = {
    pruebaPublication,
    save,
    detail,
    remove,
    user
}