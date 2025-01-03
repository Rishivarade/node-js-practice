const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const OTPgenerate = require("../utils/otp");
const Sendmail = require("../utils/sendmail");
const ejs = require("ejs")

//Signup
const Signup = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill in all fields." })
    }
    try {
        const isExist = await UserModel.findOne({ email })
        if (isExist) {
            return res.status(400).json({ error: "Email already exists." })
        }
        
        const { otp, verification_Token } = OTPgenerate(req.body)
        console.log(otp, verification_Token)

        const htmlTemplate = await ejs.renderFile(__dirname + "/../views/email.ejs", {
            name, otp
        })
        await Sendmail(email, htmlTemplate)
        res.cookie("Verification_Token", verification_Token).status(200).json({ message: "Email sent successfully." })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error });
    }
}

//Verify 
const Verification = async (req, res) => {
    const { otp } = req.body
    const { Verification_Token } = req.cookies
    if (!otp) {
        return res.status(400).json({ error: "Please enter OTP." })
    }
    jwt.verify(Verification_Token, `${process.env.SECRET_KEY}`, async function (err, decoded) {
        if (err) {
            return res.status(400).json({ error: "Invalid token." })
        }
        if (decoded.otp !== otp) {
            return res.status(400).json({ error: "Invalid OTP." })
        }
        try {
            await UserModel.create(decoded.user)
            console.log(decoded)
            res.status(200).json({ message: "User created successfully." })

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: error.message });
        }
    })

}

module.exports = { Signup, Verification }