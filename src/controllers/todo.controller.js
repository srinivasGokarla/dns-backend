import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js";
import { statusCode } from "../utils/constants.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const createTodo = async (req,res)=>{
   
 const errors = validationResult(req);
 if(!errors.isEmpty()){
    return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"Todo is required",errors.mapped()))
 }   
try {
   const result =  await Todo.create({
    userId:req.userId,
    desc:req.body.desc,
   })
   if(result){
    const user = await User.findOneAndUpdate({_id:req.userId},{
       $push:{todos:result}
    })
    return res.json(jsonGenerate(statusCode.SUCCESS,"Todo Created Successfully",result))
   }
} catch (error) {
    return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"something went wrong",error))
}

}