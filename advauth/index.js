const express = require("express")
const dotenv = require("dotenv")
const UserRouter = require("./routes/user.routes")
const connection = require("./utils/db")
var cookieParser = require('cookie-parser')
dotenv.config()
const app = express()
app.use(cookieParser())
app.use(express.json())

app.set("view engine","ejs")

app.use("/api/user", UserRouter)

// app.get("/email",(req,res)=>{
//     res.render("email")
// })


app.listen(process.env.PORT || 3000, async () => {
    try {
        await connection;
        console.log("connected to db")
        console.log(`server running on PORT ${process.env.PORT}`)

    } catch (error) {
        console.log(error)
    }

})
