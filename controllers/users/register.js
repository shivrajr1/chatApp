const {db}=require("../../config/db");
const wrapAsync = require("../../uitl/wrapAsync");
module.exports=(req,res)=>{
    let q1=`select * from users where username=?`
     db.query(q1,[req.body.username],(err,result)=>{
        if(err){
            return res.status(402).send("db error");
        }
        let values = [req.body.username, req.body.email, req.body.number, req.body.role, req.body.password];
        if(result.length==0){ 

            let q2=`insert into users(username,email,mobile_number,role,pswd) values ?;`;
          
            db.query(q2,[[values]],(err,result)=>{
                if(err){
                    return res.status(402).send("db error");
                } 
                req.session.user=result[0];
                return res.status(200).send("success");
            })
        }else{
            return res.status(400).send("user already exist");
        }
    })
    
}