const fsPromises=require('fs').promises;    
const path=require('path');
const userDB={
    users:require('../model/db.json'),
    setUsers:function(data){
        this.users=data;
    }
}
const createEmployee=async (req,res)=>{
    const{name,password,email}=req.body;
    if(!name || !password || !email){   
    return res.status(400).json({msg:"please include name,password,email"});
    }
    if(userDB.users.some(user=>user.email===email)){
      return res.status(400).json({msg:"email already exists enter new email are login"});
    }
    const id=userDB.users.length?userDB.users[userDB.users.length-1].id+1:1;
    const user={id,name,email,password};
    userDB.setUsers([...userDB.users,user]);
    fsPromises.writeFile(path.join(__dirname,'../model/db.json'),JSON.stringify(userDB.users,null,2))
    .then(()=>res.status(201).json(user))
    .catch(err=>res.json({msg:"error occured while creating employee"}));
}
module.exports={createEmployee};