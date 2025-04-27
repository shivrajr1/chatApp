const {db}=require("../../config/db");
module.exports=(req,res,next)=>{
  
    let q=`select * from users where username=?`;
       db.query(q,[req.body.username],(err,result)=>{
        if(err){
          return res.status(402).send("db error");
        }
        if(result.length!=0 && result[0].pswd==req.body.password){
            req.session['user']=result[0];
          return res.status(200).send("success");
        }else{
          res.status(400).send("user or password incorrect")
        }
        })
}