const sql=require("mysql2")
require("dotenv").config();


const dbconnect=sql.createConnection({
    host:process.env.host,
    port:process.env.port,
    user:process.env.username,
    database:process.env.database,
    password:process.env.dbpassword,
      ssl: {
        rejectUnauthorized: true
    }


    
})

console

dbconnect.connect((err)=>{
    if(err){
        console.log(err.message)
    }

    console.log("database connected successfully")
})


module.exports={dbconnect}