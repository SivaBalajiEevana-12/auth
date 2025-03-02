const allowedOrigin=require('../cofig/allowedOrigin');

const credentials=(req,res,next)=>{
    const origin=req.headers.origin;
    if(allowedOrigin.includes(origin)){
        res.header('Access-Control-Allow-Origin',origin);
    }
    next();
}

module.exports=credentials;