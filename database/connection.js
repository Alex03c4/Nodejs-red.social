const mongoose = require('mongoose');

const connection = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb+srv://Alex03c4:EOYDdQh90GZQ8Nkf@cluster0.myvgi.mongodb.net/redsocial");        
        console.log("Conectado correctamente a la base de datos");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos !!");
    }
}


module.exports = connection ;
