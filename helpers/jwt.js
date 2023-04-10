const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload= {
            uid
        };
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
                if(err){
                    console.log(err)
                    reject('Error, no se puede generar el jwt')
                }else{
                    resolve(token);
                }
        });



    });

}   

module.exports= {
    generarJWT
}