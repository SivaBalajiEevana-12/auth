const credentials = require('../middleware/credentials');
const allowedOrigins =require('./allowedOrigin');
const corsOption={

    origin:(origin,callback)=>{
        if(allowedOrigins.indexOf(origin)!==-1 || !origin){
            callback(null,true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
        optionSuccessStatus : 200,
        credentials:true
    
}
module.exports=corsOption;