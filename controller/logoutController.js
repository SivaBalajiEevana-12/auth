const fsPromises=require('fs').promises;    
const jwt=require('jsonwebtoken');
const path=require('path');
// const bcrypt=require('bcrypt');
// const { access } = require('fs');
const userDB={
    users:require('../model/db.json'),
    setUsers:function(data){
        this.users=data;
    }
}
const handleLogout=async (req,res)=>{
   const cookies=req.cookies;
   if(!cookies?.jwt){
    return res.status(400).json({msg:"please login first"});
    const refreshToken=cookies.jwt;
    const foundUser=userDB.users.find(user=>user.refreshToken===refreshToken);
    if(!foundUser){
        res.clearcookie('jwt',{httpOnly:true,sameSite:'None',secure:true});
        return res.status(404).json({msg:"user not found"});    
    }
    const otherUsers=userDB.users.filter(user=>user.name!==foundUser.name);
    const currentUser={...foundUser,refreshToken:''};
    userDB.setUsers([...otherUsers,currentUser]);   
    await fsPromises.writeFile(path.join(__dirname,'../model/db.json'),JSON.stringify(userDB.users));    
    res.clearcookie('jwt',{httpOnly:true,sameSite:'None',secure:true});
    res.sendStatus(204).json({msg:"logout successfully"});
    
}

}
module.exports={handleLogout};