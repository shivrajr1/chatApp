const {db}=require("../../config/db")

module.exports=(req,res)=>{
    // if(!req.session.user){
    //     return res.status(410).send("unauthorised");
    // }
    let q=`select * from messages`; 
    db.query(q,(err,result)=>{
        if(err){
            return res.status(402).send("db error");
        }
        return res.status(200).send(result)
    })
}