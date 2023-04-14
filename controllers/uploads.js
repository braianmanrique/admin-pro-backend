const { response } = require("express");

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-image");
const  patch  = require("path");
const fs = require("fs");



const fileUpload = async(req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if( !tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'el tipo seleccionado no es medico,usuario,hospital'
        })
    }
    // validate if exists file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

    // process img
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length -1];

    const extensionesValidas = ['png','jpg','jpeg', 'gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'no es una extension permitida'
        })
    }
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    // path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
    if (err){
        console.log(err)
        return res.status(500).send(err);

        }

        // Update db
        actualizarImagen(tipo,id, nombreArchivo);
      
        res.json({
            ok: true,
            nombreArchivo,
            msg: 'file uploaded'
        })
  });

}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = patch.join(__dirname, `../uploads/${tipo}/${foto}`);


    if(fs.existsSync(pathImg)){{
        res.sendFile(pathImg); 
    }}else{
        const pathImg = patch.join(__dirname, `../uploads/no-image.jpg`);
        res.sendFile(pathImg)

    }
    
    

// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));
}

module.exports = {
    fileUpload,
    retornaImagen
}