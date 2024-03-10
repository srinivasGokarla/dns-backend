import { validationResult } from "express-validator";
import User from "../models/User.js";
import { jsonGenerate } from "../utils/helpers.js";
import { JWT_TOKEN_SECRET_KEY, statusCode } from "../utils/constants.js";
import  Jwt  from "jsonwebtoken";

export const Login = async (req,res) =>{
    const errors = validationResult(req)
   if(errors.isEmpty()){
   const {username,password} = req.body;
   const user = await User.findOne({
    username:username
   })

  if(!user){
  return  res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Username or Password is incorrect"))
  }
  if(password != user.password){
      return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Username or Password is incorrect"))
      }


const token = Jwt.sign({userId:user._id},JWT_TOKEN_SECRET_KEY);


return res.json(jsonGenerate(statusCode.SUCCESS,"Login Successful",{userId:user._id,token:token}))
}

 return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"Validation error",errors.mapped()))
}