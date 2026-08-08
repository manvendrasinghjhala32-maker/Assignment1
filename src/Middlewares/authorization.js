const authorization = (...roles)=>{
    return (req,res,next) => {
        if(!rules.include(req.user.roles)){
            res.status(401).send({message:"You are not authorized to access this data"})
        }
        next();        
    }
}

module.exports = authorization;  