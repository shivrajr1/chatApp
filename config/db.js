
const mysql=require("mysql2");

const db=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    database:process.env.database,
    password:process.env.password
})
 function db_connection(){
     db.connect((err)=>{
        if(err){
             throw new err;
        }
        console.log("database connected..");
    })
}
module.exports={db,db_connection};