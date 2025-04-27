module.exports=(fun)=>{
    return (req,res,next)=>{
        fun(req,res,next).catch((e)=>{
            console.log('error in wrap catch')
            next(e)
        })
}}