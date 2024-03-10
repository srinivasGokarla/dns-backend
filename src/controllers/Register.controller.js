import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { statusCode } from "../utils/constants.js";
import Jwt from "jsonwebtoken";
import { JWT_TOKEN_SECRET_KEY } from "../utils/constants.js";
import User from "../models/User.js";

export const Register = async (req,res)=>{
    const errors = validationResult(req);
  
    if(errors.isEmpty()){
     const {name,username,password,email}= req.body
    

    const userExist = await User.findOne({ $or: [{
        email:email
    },{
        username:username
    }
]});

if(userExist){
    return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Username or Email already exists"))
}
     try {
        const result = await User.create({
            name:name,
            email:email,
            password:password,
            username:username,
        })
        const token = Jwt.sign({
            userId:result._id
        },JWT_TOKEN_SECRET_KEY)
     return  res.json(jsonGenerate(statusCode.SUCCESS,"regristration successfull",{userId:result._id,token:token}))
     } catch (error) {
        console.log(error)
     }
    }
    res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"validation error",errors.mapped()))
    
}