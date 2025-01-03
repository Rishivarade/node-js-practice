const otpGenerator = require("otp-generator")
const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken")

function OTPgenerate(UserInfo) {

    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    })
    // console.log(otp)

    //token create
    const token = jwt.sign({ otp, user: UserInfo }, `${process.env.SECRET_KEY}`)

    return {
        otp,
        verification_Token: token
    }

}

module.exports=OTPgenerate