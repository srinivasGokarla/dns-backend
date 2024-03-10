import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js"
import { statusCode } from "../utils/constants.js"
import Todo from "../models/Todo.js"
export const MarkTodo = async (req,res)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"todo id is required",errors.mapped()))
    }
    try {
       const todo = await Todo.findOneAndUpdate({
        _id: req.body.todo_id,
        userId: req.userId,
       },[{
          $set:{
            isCompleted:{
                $eq:[false,"$isCompleted"]
            }
          }
       }]);

   if(todo){
    return res.json(jsonGenerate(statusCode.SUCCESS,"updated",todo));
   }

    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"not updated",null));
    }
}