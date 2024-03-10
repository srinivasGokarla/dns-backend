import { check } from "express-validator";

export const LoginSchema=[
    check('username','username is required').exists().isAlphanumeric().withMessage("atleast one alphabet or one number required").isLength({
        min:6,
        max:32
    }),
    check('password','password is required').isLength({
        min:8,
        max:50
    })
]