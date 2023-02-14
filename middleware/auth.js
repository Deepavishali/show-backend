//custom middle ware //
import  Jwt  from "jsonwebtoken";

 export const auth=(req,res,next)=>{
    try{
        const token = req.header("x-auth-token");
        console.log(token);
        Jwt.verify(token,process.env.SECRET_KEY);
        next();
    }
    catch{
        res.send({error:err.message});
    }
};