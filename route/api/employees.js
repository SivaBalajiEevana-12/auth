const express=require('express');
const router=express.Router();
const fsPromises=require('fs').promises;
const path=require('path');
const Roles_List=require('../../cofig/roles_list');
const verifyRoles=require('../../middleware/verifyRoles')
const employeeController=require('../../controller/employeeController');
const userDB={
    users:require('../../model/db.json'),
    setUsers:function(data){this.users=data;}
}
router.route('/employees')
// .get((req,res)=>{
//     res.json(userDB.users);
// })
.get( (req,res) => {
    res.json(userDB.users)
})
// .post((req,res)=>{
//     const{name,password,email}=req.body;
//     if(!name || !password || !email){
//         return res.status(400).json({msg:"please include name,password,email"});
//     }
//     if(userDB.users.some(user=>user.email===email)){
//         return res.status(400).json({msg:"please enter valid email"});
//     }
//     const id = userDB.users.length ? userDB.users[userDB.users.length - 1].id + 1 : 1;
//     const user = { id, name, email, password };
//     userDB.setUsers([...userDB.users,user]);
//     fsPromises.writeFile(path.join(__dirname,'../../model/db.json'),JSON.stringify(userDB.users,null,2))
//     .then(()=>res.status(201).json(user))
//  .catch( err =>res.status(500).json({msg:err.message}));
// })
.post(verifyRoles(Roles_List.Admin,Roles_List.Editor),employeeController.createEmployee)
.put(verifyRoles(Roles_List.Admin,Roles_List.Editor),(req,res)=>{
    const { id, name, email, password } = req.body;
        
    if (!id || !name || !email || !password) {
        return res.status(400).json({ msg: "Please include id, name, email, and password" });
    }

    const userIndex = userDB.users.findIndex(user => user.id === parseInt(id));
    
    if (userIndex === -1) {
        return res.status(404).json({ msg: "User not found" });
    }

    // Update the user
    userDB.users[userIndex] = { id: parseInt(id), name, email, password };

    fsPromises.writeFile(path.join(__dirname, '../../model/db.json'), JSON.stringify(userDB.users, null, 2))
        .then(() => res.json({ msg: "User updated", user: userDB.users[userIndex] }))
        .catch(err => res.status(500).json({ msg: err.message }));
})
.delete(verifyRoles(Roles_List.Admin),(req,res)=>{
    const {id}=req.body;
    if(!id){
       return res.status(400).json({msg:"please include id"});
    }
    const existuser=userDB.users.some(user=>user.id===parseInt(id));
    if(!existuser){
        return res.status(404).json({msg:`user with id ${id} not found`});
    }
    userDB.setUsers(userDB.users.filter(user=>user.id!==parseInt(id)));
    fsPromises.writeFile(path.join(__dirname,'../../model/db.json'),JSON.stringify(userDB.users,null,2))
    .then(()=>res.json({msg:`user with id ${id} deleted`}))
    .catch(err=>res.status(500).json({msg:err.message}));

});
module.exports=router;