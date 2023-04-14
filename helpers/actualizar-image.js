const Usuario = require('../models/usuario')
const Medico = require('../models/medico')
const Hospital = require('../models/hospital')
const fs = require('fs'); 

const borrarImagen = (path) =>{
    if(fs.existsSync(path)){
        //borrar la imagen vieja
        fs.unlinkSync(path)
    }
}
const actualizarImagen = async(tipo, id, nombreArchivo) => {
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id)    
            if(!medico){
                return false;
            }
            const pahtViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pahtViejo); 
            
            medico.img = nombreArchivo;
            await medico.save();
            return true
        break;
        
        case 'hospitales':
            const hospital = await Hospital.findById(id) 
          
            if(!hospital){
                return false;
            }
            const pahtViejoHospital = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pahtViejoHospital); 
            
            hospital.img = nombreArchivo;
            await hospital.save();
            return true
            break;
    
        case 'usuarios':
            const usuario = await Usuario.findById(id) 
          
            if(!usuario){
                return false;
            }
            const pahtViejoUsuario = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pahtViejoUsuario); 
            
            usuario.img = nombreArchivo;
            await usuario.save();
            return true
        
            break;
    
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}