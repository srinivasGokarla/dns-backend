import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js";
import { statusCode } from "../utils/constants.js";
import Todo from "../models/Todo.js";
import User from "../models/User.js";

export const RemoveTodo =async (req,res)=>{
const errors = validationResult(req);

if(!errors.isEmpty()){
    return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"todo id is required",errors.mapped()))
}

try {
    const result = await Todo.findOneAndDelete({
        userId: req.userId,
        _id:req.body.todo_id 
    })

    if(result){
        const user = await User.findOneAndUpdate({
            _id:req.userId,

        },
        {
          $pull:{todos:req.body.todo_id}  
        }
        )
   return res.json(jsonGenerate(statusCode.SUCCESS,"Todo Deleted", null))
    }
} catch (error) {
    return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"not Deleted", null))
}
}