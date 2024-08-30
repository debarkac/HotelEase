const jwt=require('jsonwebtoken')

const jwtAuthMiddleware=(req,res,next)=>{
    //First check the request header has authorization or not
    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({error:"Token not found"})

    //Extract jwt token from request header

    //Split the authorization token based on space and take the next token while leaving Bearer word
    const token=req.headers.authorization.split(' ')[1]


    if(!token)    return res.status(401).json({error: 'Unauthorized'})
    
    try{
        //Verify the token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)


        //Send the decoded to the next place in server
        req.user=decoded
        next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({error: "Invalid token"})
    }

}


//Function to generate JWT token
const generateToken=(userData)=>{
    //Generate a JWT token using user data which will expire in 100 seconds
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:100})
}


module.exports={jwtAuthMiddleware,generateToken}