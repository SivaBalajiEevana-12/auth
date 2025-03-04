// const fsPromises=require('fs').promises;    
// const path=require('path');
const User=require('../model/User')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
// const userDB={
//     users:require('../model/db.json'),
//     setUsers:function(data){
//         this.users=data;
//     }
// }
const handleLogin=async (req,res)=>{
    const{name ,password}=req.body;
    if(!name || !password){
        return res.status(400).json({msg:"please include name and password"});
    }
    const foundUser=await User.findOne({"username":name}).exec();
    if(!foundUser){
        return res.status(404).json({msg:"user not found"});
    }
    const match=await bcrypt.compare(password,foundUser.password);
    const roles = Object.values(foundUser.roles);
    if(match){
         const accessToken=jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.name,
                    "roles": roles
                }
            },
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn:'260s'}
                    );
                    const refreshToken=jwt.sign(
                        {name:foundUser.name},
                        process.env.REFRESH_TOKEN_SECRET,
                        {expiresIn:'1d'}
                    );
        // const otherUsers=userDB.users.filter(user=>user.name!==foundUser.name);
        // const currentUser={...foundUser,refreshToken};
        // userDB.setUsers([...otherUsers,currentUser]);
        // await fsPromises.writeFile(path.join(__dirname,'../model/db.json'),JSON.stringify(userDB.users,null,2));
        // console.log(accessToken);
        // console.log(refreshToken);
        foundUser.refreshToken=refreshToken;
        const result=await foundUser.save();
        console.log(result);
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None'},{maxAge:24*60*60*1000});
        console.log(res.cookie);
        console.log('Cookie set:', res.get('Set-Cookie')); // Log the Set-Cookie header
        res.json({accessToken,"success":`welcome ${name}`})
        

        // res.json({"success":`welcome ${name}`});
    }
    else{
        res.status(400).json({msg:"invalid password and try again or register yourself"});
    }

}
module.exports={handleLogin};