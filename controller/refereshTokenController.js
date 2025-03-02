// const fsPromises=require('fs').promises;    
// const path=require('path');
// const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const userDB={
    users:require('../model/db.json'),
    setUsers:function(data){
        this.users=data;
    }
}
const handleRefreshToken=(req,res)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
        return res.status(401);
    }
    const refreshToken=cookies.jwt;
    const foundUser=userDB.users.find(person=>person.refreshToken===refreshToken);
    if(!foundUser){
        return res.status(403);//forbiddden
    }
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>
        {
            if(err||foundUser.name!==decoded.name)
                return res.status(403);
            const roles=Object.values(foundUser.roles);
            const accessToken=jwt.sign({  
            "UserInfo":{
            "name":decoded.name,
            "roles":roles
         }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'60s'}
        );
        res.json({accessToken})
        }
    )
}
module.exports={handleRefreshToken};