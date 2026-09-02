const sql=require("mysql2")
require("dotenv").config();


const dbconnect=sql.createPool({
    host:process.env.host,
    port:process.env.port,
    user:process.env.username,
    database:process.env.database,
    password:process.env.dbpassword,
   waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
      ssl: {
        rejectUnauthorized: true
    },



    
})

console

dbconnect.connect((err)=>{
    if(err){
        console.log(err.message)
    }

    console.log("database connected successfully")
})


module.exports={dbconnect}