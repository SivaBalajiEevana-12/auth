// const express=require('express');
// const app=express();
// require('dotenv').config();
// const cors=require('cors');
// const path=require('path');
// const fsPromises=require('fs').promises;
// const PORT=process.env.PORT || 5000;
// // const userDB={
// //     users:require('./model/db.json'),
// //     setUsers:function(data){this.users=data;}
// // }
// const registerRoute=require('./route/register');
// const loginRoute=require('./route/login');
// const logoutRoute=require('./route/logout');
// const employeeRoute=require('./route/api/employees');
// const verifyJWT=require('./middleware/verifyJwt');
// const credentials=require('./middleware/credentials');
// const cookieParser = require('cookie-parser');
// const corsOption=require('./cofig/corsOption')
// app.use(credentials)

// app.use(cors(corsOption));
// app.use(express.json());
// app.use(express.static(path.join(__dirname,'model')));
// app.use(cookieParser)
// app.get('/',(req,res)=>{
//     res.send("helloworld!");
// })

// app.use('/register',registerRoute);
// app.use('/login',loginRoute);
// app.use('/logout',logoutRoute);
// app.use(verifyJWT);
// app.use('/api',employeeRoute);
// app.listen(PORT,()=>{
//     console.log(`app listening to http://localhost:${PORT}/`);
// });
// ///http://localhost:5000/
const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
const cors=require('cors');
const path=require('path');
const fsPromises=require('fs').promises;
const PORT=process.env.PORT || 5000;
// const userDB={
//     users:require('./model/db.json'),
//     setUsers:function(data){this.users=data;}
// }
const registerRoute=require('./route/register');
const loginRoute=require('./route/login');
const logoutRoute=require('./route/logout');
const employeeRoute=require('./route/api/employees');
const verifyJWT=require('./middleware/verifyJwt');
const credentials=require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const corsOption=require('./cofig/corsOption')
const connectDB=require('./cofig/dbConn');
app.use(credentials)

app.use(cors(corsOption));
app.use(express.json());
app.use(express.static(path.join(__dirname,'model')));

app.get('/',(req,res)=>{
    res.send("helloworld!");
})
connectDB();
app.use('/register',registerRoute);
app.use(cookieParser())
app.use('/login',loginRoute);
app.use('/logout',logoutRoute);
app.use('/refresh',require('./route/refresh'))

app.use(verifyJWT);
app.use('/api',employeeRoute);
mongoose.connection.once('open',()=>{
    console.log("ksklsd")
})
app.listen(PORT,()=>{
    console.log(`app listening to http://localhost:${PORT}/`);
});
///http://localhost:5000/