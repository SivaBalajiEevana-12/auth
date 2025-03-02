// const express=require('express');
// // const path = require('path');
// const router=express.Router();
// const registerController=require('../controller/registerController');
// // const fsPromises=require('fs').promises;
// router.post('/user',registerController.handleRegister);
// module.exports=router;
const express = require('express');
const router = express.Router();
const {handleRegister} = require('../controller/registerController');

router.post('/',handleRegister);

module.exports = router;