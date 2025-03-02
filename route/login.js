const express=require('express');
// const path = require('path');
const router=express.Router();
const {handleLogin}=require('../controller/loginController');
// const fsPromises=require('fs').promises;
router.post('/user',handleLogin);
module.exports=router;