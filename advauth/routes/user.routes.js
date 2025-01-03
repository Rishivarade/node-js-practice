const express=require("express")
const { Signup, Verification } = require("../controller/user.controller")

const UserRouter=express.Router()

UserRouter.post("/signup",Signup)

UserRouter.post("/verify-otp",Verification)

module.exports=UserRouter